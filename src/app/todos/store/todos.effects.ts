import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodosApiService } from '../../services/todos-api.service';
import { TodosActions } from './todos.actions';
import { Todo } from '../../models/todos.model';

@Injectable()
export class UsersEffects {

  loadTodos$ = createEffect(() => this.actions$.pipe(
    ofType('[Todos Page] Load Todos'),
    exhaustMap(() => this.todosApiService.getTodos().pipe(
      map((todos: Todo[]) => TodosActions.set({ todos })),
      catchError(error => of(TodosActions.error({ error: error.message })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private todosApiService: TodosApiService,
  ) {}
}