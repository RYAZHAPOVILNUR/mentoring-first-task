import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})

export class AddUserDialogComponent {
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddUserDialogComponent>);

  public readonly users$ = this.usersService.users$;
  
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {
    this.form = this.fb.group({
      name: [this.data?.name, Validators.required],
      phone: [this.data?.phone, Validators.required],
      email: [this.data?.email, Validators.required],
      username: [this.data?.username, Validators.required],
      website: [this.data?.website],
    });
  }
  saveUser(): void {
    if (this.form.valid) {
      const newUser = this.form.value;
      newUser.id = Math.round(Math.random() * 1000)
      this.dialogRef.close(newUser);
    }
  }
  
}
