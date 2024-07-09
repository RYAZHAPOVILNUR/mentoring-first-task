import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../data/services/users.service';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateEditUserComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly usersService = inject(UsersService);

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      website: new FormControl(''),
    });

    if (this.data.isEdit) {
      this.form.patchValue(this.data.user);
    }
  }

  createUser() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  updateUser() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
