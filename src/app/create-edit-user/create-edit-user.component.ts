import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatPrefix,
} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { User } from '../model/user';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatLabel,
    MatFormField,
    MatDialogClose,
    MatInput,
    MatError,
    ReactiveFormsModule,
    MatPrefix,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  public data? = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  public userForm = this.fb.nonNullable.group({
    name: [this.data?.user?.name ?? '', Validators.required],
    username: [this.data?.user?.username ?? '', Validators.required],
    email: [
      this.data?.user?.email ?? '',
      [Validators.required, Validators.email],
    ],
    phone: [this.data?.user?.phone ?? '', [Validators.required]],
    website: [this.data?.user?.website ?? '', Validators.required],
  });
  private dialogRef =
    inject<MatDialogRef<CreateEditUserComponent>>(MatDialogRef);

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public saveUser(): User {
    return <User>this.userForm.getRawValue();
  }
}
