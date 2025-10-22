import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosApiService } from '../todo-api.sevice';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { Todo } from './todos.interface';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);
  readonly todosService = inject(TodosService);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: Todo[]) => {
      this.todosService.setTodos(response)
    })
  }

  deleteTodo(id: number) {
    this.todosService.deleteTodo(id)
  }
}