import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './models/todos.model';

@Injectable({ providedIn: 'root' })
export class TodosApiService {
  readonly apiService = inject(HttpClient);
    
  getTodos(): Observable<Todo[]> {
    return this.apiService.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );
  }

  deleteTodo(todoId: number) {
    return this.apiService.delete(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
    );
  }
}
