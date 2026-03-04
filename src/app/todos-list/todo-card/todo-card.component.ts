import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Todo } from '../../interfaces/todos.interface';
import { DeleteTodoDialogComponent } from '../../delete-todo-dialog/delete-todo-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditTodoDialogComponent } from '../../edit-todo-dialog/edit-todo-dialog.component';
import { LimitTitlePipe } from '../../pipes/limit.pipe';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [LimitTitlePipe],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input()
  todo!: Todo;

  @Output()
  deleteTodo: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  readonly dialog: MatDialog = inject(MatDialog);

  private snackBar: MatSnackBar = inject(MatSnackBar);

  public openDeleteDialog(): void {
    const dialogRef: MatDialogRef<DeleteTodoDialogComponent> = this.dialog.open(
      DeleteTodoDialogComponent,
      {
        width: '600px',
        data: { todo: this.todo },
      },
    );

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        this.deleteTodo.emit(this.todo.id);
        this.snackBar.open('Задача удалена!', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена удаления!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
  openEditDialog(): void {
    const dialofRef = this.dialog.open(EditTodoDialogComponent, {
      data: { todo: this.todo },
    });

    dialofRef.afterClosed().subscribe((editResult: Todo) => {
      if (editResult) {
        this.editTodo.emit(editResult);

        this.snackBar.open('Задача изменена', 'ok', {
          duration: 3000,
        });
      } else {
        this.snackBar.open('Отмена изменеия!', 'ok', {
          duration: 3000,
        });
      }
    });
  }
}
