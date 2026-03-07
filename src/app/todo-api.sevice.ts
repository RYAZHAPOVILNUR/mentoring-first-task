import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from './interfaces/todos.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosApiService {
  readonly apiService: HttpClient = inject(HttpClient);
  getTodos(): Observable<Todo[]> {
    return this.apiService.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );
  }
}
