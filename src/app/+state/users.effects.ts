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
        apiService.get().pipe(
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

export const deleteUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({id}) =>
        apiService.delete(id).pipe(
          map(() => UsersActions.deleteUserSuccess({id})),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.deleteUserFailed({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

export const addUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(({userData}) =>
        apiService.post(userData).pipe(
          map((user) => UsersActions.addUserSuccess({userData: user})),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.addUserFailed({error}));
          })
        )
      )
    );
  },
  {functional: true}
);

export const editUser = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap(({userData}) =>
        apiService.patch(userData).pipe(
          map((userData) => UsersActions.editUserSuccess({userData})),
          catchError((error) => {
            console.error('Error', error);
            return of(UsersActions.editUserFailed({error}));
          })
        )
      )
    );
  },
  {functional: true}
);
