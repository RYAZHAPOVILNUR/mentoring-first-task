import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../../users-list/edit-user-dialog/edit-user-dialog.component";
import {EditTodoDialogComponent} from "../edit-todo-dialog/edit-todo-dialog.component";
import {CreateTodoFormComponent} from "../create-todo-form/create-todo-form.component";
import {CustomTodoHiddenTextPipe} from "../../../pipes/custom-todo-hidden-text.pipe";

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgForOf,
    CustomTodoHiddenTextPipe
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
  @Input()
  todo:any

  @Output()
  deleteTodo = new EventEmitter();

  @Output()
  editTodo = new EventEmitter();

  @Output()
  createTodo = new EventEmitter();

  onDeleteTodo(todoId: number){
    this.deleteTodo.emit(todoId)
  }


  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(EditTodoDialogComponent, {
      data: {todo: this.todo},
    }).afterClosed()
      .subscribe(editResult => {
        console.log('Модалка закрылась: ', editResult)
        if(editResult) {
          this.editTodo.emit(editResult)
        }
      })
  }
}
