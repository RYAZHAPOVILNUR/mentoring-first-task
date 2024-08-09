import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {User} from "../../types/user.types";
import {CommonModule} from "@angular/common";
import {LocalStorageService} from "../../services/localstorage.service";
import {UsersService} from "../../services/users-service";

interface Data {
  title: string;
  isEdit: boolean;
  user: User
}

@Component({
  selector: 'app-dialog-overview',
  standalone: true,
  templateUrl: './dialog-overview.component.html',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatButton,
    MatInput,
    MatIconButton,
    MatIcon,
    ReactiveFormsModule,
    CommonModule,
  ],
  styleUrl: './dialog-overview.component.scss'
})
export class DialogOverviewComponent {
  public data?: Data = inject(MAT_DIALOG_DATA);
  public localStorageData = inject(LocalStorageService);
  public userService = inject(UsersService);
  public dialogRef?: MatDialogRef<DialogOverviewComponent> = inject(MatDialogRef<DialogOverviewComponent>);


  newForm = new FormGroup({
    id: new FormControl(this.data?.user?.id),
    name: new FormControl(this.data?.user?.name ?? '', [Validators.required]),
    username: new FormControl(this.data?.user?.username ?? '', [Validators.required]),
    phone: new FormControl(this.data?.user?.phone ?? '', [Validators.required]),
  });

  createUser() {
    const id = this.userService.generateId();
    const newUser = {...this.newForm.value, id};
    this.localStorageData.setItem('data', JSON.stringify(newUser));
    return this.dialogRef?.close({...this.newForm.value});
  }

  saveUser() {
    return this.dialogRef?.close({...this.newForm.value});
  }
}
