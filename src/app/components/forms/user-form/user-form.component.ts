import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  NgModule,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserFormComponent {
  
  snackBar = inject(MatSnackBar);

  @Output()
  createUser = new EventEmitter();

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormGroup({
      city: new FormControl(null, [Validators.required]),
    }),
  });

  onCreateUser(): void {
    this.createUser.emit(this.form.value);
  }

  openSecondSnackBar() {
    this.snackBar.open('Пользователь добавлен!', 'Закрыть', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
}
