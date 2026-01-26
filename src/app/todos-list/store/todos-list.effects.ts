import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodosApiService } from '../todos-api.service';

import { TodosListActions } from './todos-list.actions';

@Injectable()
export class TodosListEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(TodosApiService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosListActions.loadTodos),
      mergeMap(() =>
        this.api.getTodos().pipe(
          map((todos) => TodosListActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodosListActions.loadTodosFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
