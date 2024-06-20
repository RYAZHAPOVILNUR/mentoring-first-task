import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from "@angular/core";
import { UsersApiService } from "../services/usersApi.service";
import * as UsersActions from "./users.actions";
import { catchError, map, of, switchMap } from "rxjs";

// Loading Users
export const loadUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.initUsers),
      switchMap(
        () => usersApiService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({users})),
          catchError(error => of(UsersActions.loadUsersFailed({error})))
        )
      )
    )
  }, {functional: true}
);

// Delete User
export const deleteUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(
        ({id}) => usersApiService.deleteUser(id).pipe(
          map(() => UsersActions.deleteUserSuccess({id})),
          catchError(error => of(UsersActions.deleteUserFailed({error: error.message})))
        )
      )
    )
  }, {functional: true}
);

// Add User
export const addUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.addUser),
      switchMap(
        ({userData}) => usersApiService.addUser(userData).pipe(
          map(() => UsersActions.addUserSuccess({userData})),
          catchError(error => of(UsersActions.addUserFailed({error: error.message})))
        )
      )
    )
  }, {functional: true}
);

// Edit User
export const editUsersEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return actions$.pipe(
      ofType(UsersActions.editUser),
      switchMap(
        ({userEdit}) => {
          return usersApiService.editUser(userEdit).pipe(
            map(() => UsersActions.editUserSuccess({userEdit})),
            catchError(error => of(UsersActions.editUserFailed({error: error.message})))
          )
        }
      )
    )
  }, {functional: true}
);
