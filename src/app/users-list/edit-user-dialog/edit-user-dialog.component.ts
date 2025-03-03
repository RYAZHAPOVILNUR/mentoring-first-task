import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatDialogClose],
})
export class EditUserDialogComponent {
  readonly data = inject<{ user: User }>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditUserDialogComponent>);

  public form = new FormGroup({
    name: new FormControl(this.data.user.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
    ]),
    website: new FormControl(this.data.user.website, [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyName: new FormControl(this.data.user.company.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });
  get userWithUpdateFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }
}
