import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todo-api.sevice';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todos.interface';
import { TodosService } from '../todos.service';
import { CreateTodoFormComponent } from '../create-todo-form/create-todo-form.component';
import { CreateTodo } from '../create-todo-form/create-todo.interface';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response);
    });
  }

  createTodo(formDateTodo: CreateTodo) {
    this.todosService.createTodo({
      id: new Date().getTime(),
      title: formDateTodo.title,
      userId: formDateTodo.userId,
      completed: formDateTodo.completed,
    });
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id);
  }
}
