import { Component, inject } from '@angular/core';
import { TodosApiService } from './todos-api.service';
import { Todo } from './models/todos.model';
import { NgFor } from '@angular/common';
import { TodosCardComponent } from './todos-card/todos-card.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  imports: [NgFor, TodosCardComponent],
  standalone: true,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);

  todos: Todo[] = [];

  constructor() {
    this.todosApiService.getTodos().subscribe((response) => {
      this.todos = response;
    });
  }

  deleteTodo(todoId: number): void {
    this.todosApiService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
    });
  }
}
