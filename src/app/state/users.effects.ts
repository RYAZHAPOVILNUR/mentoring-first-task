import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { UsersApiService } from '../services/users-api.service';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const loadUsers = createEffect(
  (actions$ = inject(Actions), usersApiService = inject(UsersApiService)) => {
    return actions$.pipe(
      ofType(UsersActions.initUsers),
      exhaustMap(() =>
        usersApiService.getUsers().pipe(
          map((users) =>
            UsersActions.loadUsersSuccess({
              users: users,
            }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.loadUsersFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const deleteUser = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      exhaustMap(({ id }) =>
        of(true).pipe(
          map(() => UsersActions.deleteUserSuccess({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.deleteUserFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const addUser = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UsersActions.addUser),
      exhaustMap(({ userData }) =>
        of(true).pipe(
          map(() => UsersActions.addUserSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addUserFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);

export const editUser = createEffect(
  (actions$ = inject(Actions)) => {
    return actions$.pipe(
      ofType(UsersActions.editUser),
      exhaustMap(({ userData }) =>
        of(true).pipe(
          map(() => UsersActions.editUserSuccess({ userData })),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.editUserFailure({ error }));
          }),
        ),
      ),
    );
  },
  { functional: true },
);
