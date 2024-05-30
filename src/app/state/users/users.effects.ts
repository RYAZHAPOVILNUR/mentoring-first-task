import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserApiService } from "@services/users-api.service";
import * as UsersActions from "./users.action";
import { BehaviorSubject, catchError, map, of, switchMap } from "rxjs";
import { createUserFailure, deleteUserFailuer, editUserFailure, loadUsersFailure } from "./users.action";
import { LocalStorageAct } from "@services/localStorageAct";
import { IUser } from "@models/user.model";

export const loadUsersEffect = createEffect(() => {
  const usersApiService = inject(UserApiService);
  const actions$ = inject(Actions);
  const localStorageAct = inject(LocalStorageAct);
  const usersData = localStorageAct.getItem();

  return actions$.pipe(
    ofType(UsersActions.loadUsers),
    switchMap(() => {
      if(usersData) {
        const rawUsersData$ = new BehaviorSubject<IUser[]>(JSON.parse(usersData!)).asObservable();
        return rawUsersData$.pipe(
          map(user => UsersActions.loadUsersSuccess({users: user})),
        );
      } else {
        return usersApiService.getUser().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error: string) => {
            return of(loadUsersFailure({error}));
          })
        );
      }
    })
  );
}, {functional: true});

export const createUserEffect = createEffect(() => {
  const usersApiService = inject(UserApiService);
  const action$ = inject(Actions);

  return action$.pipe(
    ofType(UsersActions.createUser),
    switchMap(({userData}) => {
      return usersApiService.postUser(userData).pipe(
        map(() => UsersActions.createUserSuccess({userData})),
        catchError((error: string) => {
          return of(createUserFailure({error}));
        })
      );
    })
  );
}, {functional: true});

export const editUserEffect = createEffect(() => {
  const usersApiService = inject(UserApiService);
  const action$ = inject(Actions);

  return action$.pipe(
    ofType(UsersActions.editUser),
    switchMap(({userToEdit}) => {
      return usersApiService.updateUser(userToEdit).pipe(
        map((userToEdit) => UsersActions.editUserSuccess({userToEdit})),
        catchError((error: string) => {
          return of(editUserFailure({error}));
        })
      );
    })
  );
}, {functional: true});

export const deleteUserEffect = createEffect(() => {
  const action$ = inject(Actions);
  const usersApiService = inject(UserApiService);

  return action$.pipe(
    ofType(UsersActions.deleteUser),
    switchMap(({userToDelete}) => {
      return usersApiService.deleteUser(userToDelete).pipe(
        map(() => UsersActions.deleteUserSuccess({userToDelete})),
        catchError((error: string) => {
          return of(deleteUserFailuer({error}));
        })
      );
    })
  );
}, {functional: true});
