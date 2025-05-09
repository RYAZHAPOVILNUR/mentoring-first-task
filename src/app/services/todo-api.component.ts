import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../Interfaces/todo-interface';

@Injectable({ providedIn: 'root' })
export class TodoApiComponent {
    
  todoService = inject(HttpClient);

  getTodo() {
    return this.todoService.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos'
    );
  }
  
}
