import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogClose,
    MatTooltipModule,
  ],
})
export class EditUserComponent {
  
  data = inject(MAT_DIALOG_DATA);
  snackBar = inject(MatSnackBar);

  @Output()
  editUser = new EventEmitter();

  public form = new FormGroup({
    name: new FormControl(this.data.user.name, [Validators.required]),
    phone: new FormControl(this.data.user.phone, [Validators.required]),
    email: new FormControl(this.data.user.email, [Validators.required]),
    address: new FormGroup({
      city: new FormControl(this.data.user.address.city, [Validators.required]),
    }),
  });

  get userWithUpdateFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }

  openSnackBar() {
    this.snackBar.open('Пользователь изменён', 'Закрыть', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
}
