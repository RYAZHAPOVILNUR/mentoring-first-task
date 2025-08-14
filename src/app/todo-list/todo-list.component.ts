import { style } from '@angular/animations';
import { Todo } from '../interface/todo-interface';
import { Component, inject } from '@angular/core';
import { TodoApiService } from '../todo-api.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-cards/todo-card.component';
import { TodoService } from '../services/todo.service';
import { TodoFormComponent } from "./todo-cards/todo-form-card/todo-form.component";

@Component({
  selector: 'app-todo-list',
  styleUrls: ['./todo-list.component.scss'],
  templateUrl: './todo-list.component.html',
  imports: [NgFor, TodoCardComponent, AsyncPipe, TodoFormComponent],
  standalone: true,
})
export class TodoListComponent {
  readonly todoApiService = inject(TodoApiService);
  readonly todoService = inject(TodoService);

  todo = this.todoService.todos;

  constructor() {
    this.todoApiService.getTodo().subscribe((response: Todo[]) => {
      this.todoService.setUsers(response);
    });
    this.todoService.todoSubject.subscribe((todo) => (this.todo = todo));
  }

  deleteTodo(id: number) {
    this.todoService.deleteUser(id);
  }

  createTodo(todoForm: Todo){
    this.todoService.createUser({
      userId: new Date().getTime(),
      id: todoForm.id,
      title: todoForm.title,
      completed: todoForm.completed,

    })
  }
}
