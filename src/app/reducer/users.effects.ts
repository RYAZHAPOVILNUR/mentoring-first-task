import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loadUserData,
  loadUserDataFailure,
  loadUserDataSuccess,
} from './users.actions';
import { UsersApiService } from '../data/services/users-api-service.service';
import { User } from '../data/intefaces/user.interface';

export const loadUsers = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersServiceApi = inject(UsersApiService);

    return actions$.pipe(
      ofType(loadUserData),
      switchMap(() =>
        usersServiceApi.getUsers().pipe(
          map((user: User[]) => loadUserDataSuccess({ users: user })),
          catchError((error) => {
            return of(loadUserDataFailure({ error: error.message }));
          })
        )
      )
    );
  },
  { functional: true }
);
