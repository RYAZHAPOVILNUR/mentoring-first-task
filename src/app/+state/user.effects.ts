import { Actions, createEffect, ofType } from "@ngrx/effects";
import { inject } from '@angular/core';
import { UserApiService } from "../service/user-api.service";
import { switchMap, map, catchError, of } from "rxjs";
import { addUser, addUserSuccess, deleteUser, deleteUserFailed, deleteUserSuccess, editUser, editUserFailed, editUserSuccess, loadUser, loadUserFailed, loadUserSuccess } from "./user.action";

export const loadUserEffect = createEffect( ()=> {

  const api = inject(UserApiService);
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(loadUser),
    switchMap( ()=> {
      return api.getUsers().pipe(
      map(
        res => { 
          return loadUserSuccess({users: res})
          }),
          catchError( error => {
            return of(loadUserFailed({error}))
        })
      )
    })
  )
}, {functional: true})

export const deleteUser$ = createEffect( ()=> {

  const api = inject(UserApiService)
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(deleteUser),
    switchMap( ({id})=> {
      return api.deleteUser(id).pipe(
      map(
        () => { 
          return deleteUserSuccess({id})
          }),
          catchError( error => {
            return of(deleteUserFailed({error}))
        })
      )
    })
  )
}, {functional: true})

export const addUser$ = createEffect(() => {

  const api = inject(UserApiService);
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(addUser),
    switchMap(action => {
      return api.addUser(action.user).pipe(
        map((response) => addUserSuccess({user: response})),
        catchError(error => of(loadUserFailed({ error })))
      );
    })
  );
}, { functional: true });


export const editUser$ = createEffect(() => {
  const api = inject(UserApiService);
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(editUser), 
    switchMap(action => {
      return api.editUser(action.user).pipe(
        map(response => {
          return editUserSuccess({ user: response });
        }),
        catchError(error => of(editUserFailed({ error })))
      );
    })
  );
}, { functional: true });
