import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../../../data/interfaces/todoApiService";
import {MatTable} from "@angular/material/table";
import {JsonPipe, NgClass} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatDivider} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatTable,
    JsonPipe,
    MatFormField,
    MatDivider,
    FormsModule,
    NgClass
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Output() deleteTodo = new EventEmitter<Todo>();
  @Input() todo!: Todo;

  onDeleteTodo(todo: Todo) {
    this.deleteTodo.emit(todo)
  }

  onCheckTodo(todo: Todo) {
    todo.completed = !todo.completed
  }
}
