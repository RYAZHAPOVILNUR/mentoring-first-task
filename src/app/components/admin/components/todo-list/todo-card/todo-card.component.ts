import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
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


  onDeleteTodo(todoId: number){
    this.deleteTodo.emit(todoId)
  }


  readonly dialog = inject(MatDialog);

  onCreateEdit(){
    this.editTodo.emit(this.todo)
  }
}
