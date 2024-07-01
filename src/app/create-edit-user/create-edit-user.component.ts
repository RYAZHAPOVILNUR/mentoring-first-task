import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.scss',
})
export class CreateEditUserComponent implements OnInit {
  public data = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  public dialogRef: MatDialogRef<CreateEditUserComponent> = inject(
    MatDialogRef<CreateEditUserComponent>
  );

  userForm = this.fb.group({
    id: [new Date().getTime(), Validators.required],
    name: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  saveUser(): void {
    return this.dialogRef.close(this.userForm.value);
  }
}
