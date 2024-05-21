import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatInputModule } from '@angular/material/input';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MatDialogClose,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserEntity } from '../../entities/UserEntity';

type FormType<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatError,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    JsonPipe,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss'
})
export class CreateEditUserComponent implements OnInit {

  public readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly dialogData: {user: UserEntity, isEdit: boolean} = inject(MAT_DIALOG_DATA);

  userForm = new FormGroup<FormType<UserEntity>>({
    id: new FormControl(0, []),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
  });

  ngOnInit(): void {
    if (this.dialogData.user) {
      this.userForm.patchValue(this.dialogData.user)
    }
  }
}
