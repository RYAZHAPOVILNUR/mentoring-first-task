import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {UsersApiService} from "../services/users-api.service";
import {UsersAction} from "./user.action";
import {catchError, map, of, switchMap} from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";

export const loadUserEffect = createEffect(
  () => {
    const action$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return action$.pipe(
      ofType(UsersAction.loadUsers),
      switchMap(() =>
        usersApiService.getUsers().pipe(
          map( users =>
            UsersAction.loadUsersSuccess({ users })),
          catchError(error =>
            of(UsersAction.loadUsersFailure({ error }))
          )
        )
      )
    )
  }, { functional: true }
);

export const addUserEffect = createEffect(
  () => {
    const action$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return action$.pipe(
      ofType(UsersAction.createUser),
      switchMap(({ user}) => {
          return usersApiService.addUser(user).pipe(
            map((newUser) => {
              return   UsersAction.createUserSuccess({ user: newUser })
            }),
            catchError((error) => of(UsersAction.createUserFailure({ error })))
          )
        }
      )
    )
  }, { functional: true }
)

export const deleteUserEffect = createEffect(
  () => {
    const action$ = inject(Actions);
    const userApiService = inject(UsersApiService);

    return action$.pipe(
      ofType(UsersAction.deleteUser),
      switchMap(({id}) => {
        return userApiService.deleteUser(id).pipe(
          map(() => UsersAction.deleteUserSuccess({ id })),
          catchError(error => of(UsersAction.deleteUserFailure({ error })))
        )
      })
    )
  }, { functional: true }
)

export const editUserEffect = createEffect(
  () => {
    const action$ = inject(Actions);
    const usersApiService = inject(UsersApiService);

    return action$.pipe(
      ofType(UsersAction.editUser),
      switchMap(({ updatedUser}) => {
        return usersApiService.editUser(updatedUser).pipe(
          map(updatedUser => UsersAction.editUserSuccess({ updatedUser })),
          catchError(error => of(UsersAction.editUserFailure ({ error })))
        )
      })
    )
  }, { functional: true }
)
