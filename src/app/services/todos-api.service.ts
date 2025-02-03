import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Todo } from "../models/todos.model";

@Injectable({providedIn: 'root'})
export class TodosApiService {
  private url = 'https://jsonplaceholder.typicode.com/todos';
  private http = inject(HttpClient);

  public getTodos() {
    return this.http.get<Todo[]>(this.url);
  }
}