import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Todo } from '../interfaces/todos.interface';

@Component({
  selector: 'app-delete-todo-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './delete-todo-dialog.component.html',
  styleUrl: './delete-todo-dialog.component.scss',
})
export class DeleteTodoDialogComponent {
  readonly data: { todo: Todo } = inject<{ todo: Todo }>(MAT_DIALOG_DATA);
  readonly dialog: MatDialog = inject(MatDialog);
}
