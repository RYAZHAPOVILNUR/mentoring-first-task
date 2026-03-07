import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatCardActions } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../interfaces/todos.interface';

function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'да' || value === 'нет') {
      return null;
    }
    return { invalidCompleted: true };
  };
}

@Component({
  selector: 'app-create-todo-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    MatDialogClose,
    MatLabel,
    MatInputModule,
    MatFormField,
    MatCardActions,
    MatButtonModule,
  ],
  templateUrl: './create-todo-dialog.component.html',
  styleUrl: './create-todo-dialog.component.scss',
})
export class CreateTodoDialogComponent {
  readonly data: { todo: Todo } = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    userId: new FormControl('', [Validators.required, Validators.minLength(2)]),
    completed: new FormControl('', [Validators.required, completedValidator()]),
  });

  private getCompletedValue(): boolean {
    const value = this.form.get('completed')?.value!.trim().toLowerCase();
    if (value === 'да') return true;
    else return false;
  }
  get todoUp() {
    return {
      ...this.form.value,
      completed: this.getCompletedValue(),
    };
  }
}
