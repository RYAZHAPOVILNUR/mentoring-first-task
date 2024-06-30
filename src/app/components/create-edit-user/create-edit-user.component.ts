import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent {
  private readonly fb = inject(FormBuilder);
  public dialogRef: MatDialogRef<CreateEditUserComponent> =
    inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  public readonly userForm = this.fb.group({
    name: this.fb.control(this.data.user.name || '', Validators.required),
    username: this.fb.control(
      this.data.user.username || '',
      Validators.required
    ),
    email: this.fb.control(this.data.user.email || '', [
      Validators.required,
      Validators.email,
    ]),
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
