import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todo-api.sevice';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from '../interfaces/todos.interface';
import { TodosService } from '../todos.service';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, MatButton, MatIcon],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService: TodosApiService = inject(TodosApiService);
  readonly todosService: TodosService = inject(TodosService);
  readonly dialog: MatDialog = inject(MatDialog);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  createTodo(formDateTodo: Todo): void {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formDateTodo.title,
      userId: formDateTodo.userId,
      completed: formDateTodo.completed,
    });
  }

  editTodo(todo: Todo): void {
    this.todosService.editTodo({ ...todo });
  }

  deleteTodo(id: number): void {
    this.todosService.deleteTodo(id);
  }

  openCreateTodosDialog(): void {
    const dialogRef: MatDialogRef<CreateTodoDialogComponent> = this.dialog.open(
      CreateTodoDialogComponent,
    );

    dialogRef.afterClosed().subscribe((Todo: Todo) => {
      if (!Todo) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }

      if (Todo) {
        this.snackBar.open('Задача добавлена', 'ok', { duration: 3000 });
        this.createTodo(Todo);
      }
    });
  }
}
