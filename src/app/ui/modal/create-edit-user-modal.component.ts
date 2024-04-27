import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-mat-dialog',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-edit-user-modal.component.html',
  styleUrl: './create-edit-user-modal.component.scss',
})
export class CreateEditUserModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateEditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}
  
  private readonly fb = inject(FormBuilder);
  public readonly userFormGroup = this.fb.group({
    name: [this.data?.name ?? ''],
    username: [this.data?.username ?? ''],
    email: [this.data?.email ?? ''],
    address: this.fb.group({
      city: [this.data?.address?.city ?? ''],
      street: [this.data?.address?.street ?? ''],
    }),
  });
  public onSubmit(): void {
    this.dialogRef.close({ ...this.data, ...this.userFormGroup.value});
  }
  public onNoClick(): void {
    this.dialogRef.close(null);
  }
}
