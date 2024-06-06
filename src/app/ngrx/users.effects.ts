import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadUserAction, loadUserSuccessAction, loadUserFailureAction } from './users.actions';
import { UsersApiService } from '../users-api.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffect {
  constructor(
    private actions$: Actions,
    private api: UsersApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserAction),
      mergeMap(() =>
        this.api.getUsers().pipe(
          map(users => loadUserSuccessAction({ users })),
          catchError(error => of(loadUserFailureAction({ error })))
        )
      )
    )
  );
}
