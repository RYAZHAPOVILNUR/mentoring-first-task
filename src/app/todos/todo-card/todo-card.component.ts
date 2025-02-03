import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CreateEditTodoComponent } from "../create-edit-todo/create-edit-todo.component";
import { Todo } from "../../models/todos.model";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
})

export class TodoCardComponent {
  @Input() todo: Todo;
  @Output() deleteTodo = new EventEmitter();
  @Output() editTodo = new EventEmitter();
  public onDeleteTodo(id: number) {
    this.deleteTodo.emit(id);
  }

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditTodoComponent, {
      data: this.todo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editTodo.emit(result)
      }
    });
  }
}