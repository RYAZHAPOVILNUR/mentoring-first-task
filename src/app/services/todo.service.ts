import {inject, Injectable} from '@angular/core';
import {TodoApiService} from "./todo-api.service";
import {BehaviorSubject, Observable, of, tap} from "rxjs";
import {ITodo} from "../interfaces/itodo";
import {LocalStorageService} from "./local-storage.service";

interface ITodoService{
  loadTodos(): void;
  deleteTodo(id: number): void;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService implements ITodoService{
  private todosObject$ = new BehaviorSubject<ITodo[]>([]);
  public readonly todos$ = this.todosObject$.asObservable();
  constructor(private _todoApiService: TodoApiService) { }

  loadTodos(): Observable<ITodo[]> {
    return this._todoApiService.getTodos().pipe(
      tap((todos: ITodo[]) => {
        this.todosObject$.next(todos);
      })
    );
  }

  deleteTodo(id: number): Observable<void> {
    this.todosObject$.next(this.todosObject$.value.filter(todo => todo.id !== id));
    return of(void 0);
  }

}
