import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "./todos-list/todos.interface";

@Injectable({providedIn: 'root'})

export class TodosApiService{
  readonly apiService = inject(HttpClient);
  getTodos() {
    return this.apiService.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  }
}