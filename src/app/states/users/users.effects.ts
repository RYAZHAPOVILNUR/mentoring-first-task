import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {catchError, map, of, switchMap} from "rxjs";
import {UsersApiService} from "../../usersApi.service";
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess
} from "./users.actions";


export const loadUserEffect = createEffect(
  () => {
    const api = inject(UsersApiService)
    const actions$ = inject(Actions);
    return actions$.pipe(
      ofType(loadUsers),
      switchMap(() => {
        return api.GETUsers().pipe(
          map(users => {
            return loadUsersSuccess({users})
          }),
          catchError(error => {
            return of(loadUsersFailure({error}))
          })
        )
      })
    )
  }, {functional: true})



export const addUserEffect = createEffect(() => {
  const api = inject(UsersApiService);
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(addUser),
    switchMap(({userData}) => {
      console.log(userData)
      return api.POSTUser(userData).pipe(
        map(() => addUserSuccess({userData})),
        catchError(error => {
          return of(
            addUserFailure({error})
          )
        })
      )
    })
  )

}, {functional: true})

export const updateUserEffect = createEffect(() => {
  const api = inject(UsersApiService)
  const actions$ = inject(Actions);

  return actions$.pipe(
    ofType(updateUser),
    switchMap(({updatedUser}) => {
      console.log(updateUser)
      return api.PATCHUser(updatedUser).pipe(
        map(() => updateUserSuccess({updatedUser})),
        catchError(error => of(updateUserFailure({error})))
      )
    })
  )
}, {functional: true})

export const deleteUserEffect = createEffect(
  () => {
    const api = inject(UsersApiService)
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(deleteUser),
      switchMap(({id}) => {
        return api.DELETEUser({id}).pipe(
          map(() => deleteUserSuccess({id})),
          catchError(error => of(deleteUserFailure({error})))
        )
      })
    )
  }, {functional: true})

