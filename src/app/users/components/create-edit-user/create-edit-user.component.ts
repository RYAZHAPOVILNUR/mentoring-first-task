import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { User } from '../../interface/users.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-create-edit-user-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css',
})
export class CreateEditUserComponent {
  public isEdit: boolean;

  private readonly data: User = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<CreateEditUserComponent> =
    inject(MatDialogRef);
  private readonly usersService = inject(UsersService);

  constructor() {
    this.isEdit = !!this.data;
    if (this.data) {
      this.userForm.patchValue(this.data);
    }
  }

  userForm = this.fb.group({
    id: [new Date().getTime(), Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser = { ...this.userForm.value };
      if (this.isEdit) {
        updatedUser.id = this.data.id;
      }
      this.dialogRef.close({ ...this.userForm.value, ...this.data });
    }
  }
}
