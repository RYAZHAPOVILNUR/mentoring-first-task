import { Component, inject, OnInit } from '@angular/core';
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
export class CreateEditUserComponent implements OnInit {
  public data? = inject(MAT_DIALOG_DATA);
  private dialogRef =
    inject<MatDialogRef<CreateEditUserComponent>>(MatDialogRef);
  private fb = inject(FormBuilder);
  public userForm = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    website: ['', Validators.required],
  });

  ngOnInit(): void {
    this.userForm.patchValue({ ...this.data });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSaveUser(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(<User>this.userForm.getRawValue());
    }
  }
}
