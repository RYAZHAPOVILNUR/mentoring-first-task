import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../../services/todo.service";
import {deleteTodo, loadTodos, loadTodosFailure, loadTodosSuccess} from "./todos.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { ITodo } from "../../interfaces/itodo";

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.loadTodos().pipe(
          map((todos: ITodo[]) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosFailure({ error })))
        )
      )
    )
  );


  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      mergeMap((id: number | any | unknown | undefined) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => loadTodos()),
          catchError((error) => of(loadTodosFailure({error})))
        )
      )
    )
  )
}
