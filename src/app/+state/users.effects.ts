import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import * as UsersActions from './users.actions';
import {UsersApiService} from "../services/users-api.service";

export const userEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(() =>
        apiService.getUsers().pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.loadUsersFailure({error}));
          })
        )
      )
    );
  },
  {functional: true}
);
