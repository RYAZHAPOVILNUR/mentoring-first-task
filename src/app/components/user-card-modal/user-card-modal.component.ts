import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from '../../types/user.interface';

@Component({
  selector: 'app-user-card-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './user-card-modal.component.html',
  styleUrl: './user-card-modal.component.scss',
})
export class CreateUserModalComponent {
  readonly dialogRef = inject(MatDialogRef<CreateUserModalComponent>);
  readonly data: { user: User; isEdit: boolean } = inject(MAT_DIALOG_DATA);
  dialog: MatDialog = inject(MatDialog);
  reactiveForm!: FormGroup;

  constructor() {
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.data?.user?.name, [
        Validators.required,
        Validators.minLength(4),
      ]),
      username: new FormControl(this.data?.user?.username, Validators.required),
      email: new FormControl(this.data?.user?.email, Validators.required),
      phone: new FormControl(this.data?.user?.phone, [Validators.required]),
    });
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    this.reactiveForm.valid &&
      this.dialogRef.close({
        id: this.data?.user?.id,
        ...this.reactiveForm.value,
      });
  }
}
