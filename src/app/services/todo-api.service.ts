import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITodo} from "../interfaces/itodo";

interface ITodoApi{
  getTodos(): Observable<ITodo[]>;
}

@Injectable({
  providedIn: 'root'
})
export class TodoApiService implements ITodoApi{
  private readonly apiRoute = "https://jsonplaceholder.typicode.com";
  readonly httpClient: HttpClient = inject(HttpClient);

  getTodos(): Observable<ITodo[]>
  {
    return this.httpClient.get<ITodo[]>(`${this.apiRoute}/todos`);
  }
}
