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
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
})
export class EditTodoDialogComponent {
  readonly data: { todo: Todo } = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

  private getCompletedValue(): boolean {
    const value = this.form.get('completed')?.value!.trim().toLowerCase();
    if (value === 'да') return true;
    else return false;
  }

  public form = new FormGroup({
    title: new FormControl(this.data.todo.title, [
      Validators.required,
      Validators.minLength(2),
    ]),
    userId: new FormControl(this.data.todo.userId, [
      Validators.required,
      Validators.minLength(2),
    ]),
    completed: new FormControl(this.data.todo.completed ? 'да' : 'нет', [
      Validators.required,
      completedValidator(),
    ]),
  });
  get todoWithUpdatedFields() {
    return {
      ...this.form.value,
      id: this.data.todo.id,
      completed: this.getCompletedValue(),
    };
  }
  ngOnInit(): void {
    this.form.patchValue({
      ...this.data.todo,
      completed: this.data.todo.completed ? 'да' : 'нет',
    });
  }
}
