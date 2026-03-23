import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todo-api.sevice';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from '../interfaces/todos.interface';
import { CreateTodoDialogComponent } from '../create-todo-dialog/create-todo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodosActions } from './store/todo.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, MatButton, MatIcon],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly todos$: Observable<Todo[]> = this.store.select(
    (state) => state.todos.todos,
  );
  ngOnInit() {
    this.store.dispatch(TodosActions.load());
  }

  public deleteTodo(id: number) {
    this.store.dispatch(TodosActions.delete({ id }));
  }

  editTodo(todo: any) {
    this.store.dispatch(TodosActions.edit({ todo }));
  }

  openCreateTodosDialog(): void {
    const dialogRef = this.dialog.open<
      CreateTodoDialogComponent,
      undefined,
      Todo
    >(CreateTodoDialogComponent);

    dialogRef.afterClosed().subscribe((newTodo: Todo | undefined) => {
      if (!newTodo) {
        this.snackBar.open('Отмена добавления!', 'ok', { duration: 3000 });
        return;
      }

      this.store.dispatch(TodosActions.create({ todo: newTodo }));
    });
  }
}
