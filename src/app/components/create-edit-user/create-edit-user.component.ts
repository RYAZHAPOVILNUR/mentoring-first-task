import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    UserCardComponent,
    CommonModule,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponen {
  isEdit?: boolean;
  public data = inject(MAT_DIALOG_DATA);
  public userService = inject(UserService);
  public dialogRef = inject<MatDialogRef<CreateEditUserComponen>>(MatDialogRef);

  public newForm = new FormGroup({
    name: new FormControl(this.data?.user?.name ?? '', [Validators.required]),
    username: new FormControl(this.data?.user?.username, [Validators.required]),
    phone: new FormControl(this.data?.user?.phone, [Validators.required]),
    email: new FormControl(this.data?.user?.email, [
      Validators.required,
      Validators.email,
    ]),
  });

  public close() {
    this.dialogRef?.close();
  }

  public saveUser() {
    if (this.newForm.valid && this.newForm.value) {
      const user = Boolean(this.data.user)
        ? {
            ...this.data.user,
            ...this.newForm.value,
          }
        : { id: new Date().getTime(), ...this.newForm.value };
      this.dialogRef.close(user);
    } else {
      alert('Заполните корректно!');
    }
  }

  public stopDialogClose(event: MouseEvent) {
    if (event.button === 0) {
      event.preventDefault();
    }
  }
}
