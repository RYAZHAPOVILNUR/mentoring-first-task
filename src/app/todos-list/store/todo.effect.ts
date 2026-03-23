import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosActions } from './todo.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { TodosApiService } from '../../todo-api.sevice';
import { Todo } from '../../interfaces/todos.interface';

export const loadTodos$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    todosApiService: TodosApiService = inject(TodosApiService),
  ) =>
    actions$.pipe(
      ofType(TodosActions.load),
      switchMap(() =>
        todosApiService.getTodos().pipe(
          map((todos: Todo[]) => TodosActions.loadSuccess({ todos })),
          catchError(() =>
            of(TodosActions.loadFailure({ error: 'ошибка загрузки' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
