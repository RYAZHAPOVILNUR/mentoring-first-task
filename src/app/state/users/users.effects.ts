import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs'
import { UsersApiService } from '../../services/users-api-service'
import {
  addUser, deleteUser, deleteUserFailure,
  deleteUserSuccess, loadUsers, loadUsersFailure,
  loadUsersSuccess, addUserSuccess, addUserFailure,
  updateUser, updateUserSuccess, updateUserFailure,
} from './users.actions'
import { LocalStorageService } from '../../services/local-storage.service'
import { UsersService } from '../../services/users-service'
import { User } from '../../data/interfaces/users.interface'
import { Store } from '@ngrx/store'
import { selectUsers } from './users.selectors'
export const loadUserEffect$ = createEffect(() => {
  const actions$ = inject(Actions)
  const api = inject(UsersApiService)
  const localStorageService = inject(LocalStorageService)

  return actions$.pipe(
    ofType(loadUsers),
    switchMap(() => {
      const localUsers = localStorageService.getUsers()

      if (localUsers && localUsers.length > 0) {
        return of(loadUsersSuccess({ users: localUsers }))
      } else {
        return api.getUsers().pipe(
          map(users => {
              localStorageService.setUsers(users)
              return loadUsersSuccess({ users })
            },
          ),
          catchError(error => {
            console.error('Load users failed:', error)
            return of(loadUsersFailure({ error }))
          }),
        )
      }
    }),
  )
}, { functional: true })
export const addUserEffect$ = createEffect(() => {
  const actions$ = inject(Actions)
  const usersService = inject(UsersService)
  const localStorageService = inject(LocalStorageService)
  const store = inject(Store)

  return actions$.pipe(
    ofType(addUser),
    withLatestFrom(store.select(selectUsers)),
    switchMap(([{ user }, currentUsers]) => {
      const storedUsers = localStorageService.getUsers() || currentUsers
      const newId = usersService.generateNewId(storedUsers)
      const newUser = { ...user, id: newId }

      const updatedUsers = [...storedUsers, newUser]
      localStorageService.setUsers(updatedUsers)
      return of(addUserSuccess({ user: newUser }))
    }),
    catchError((error) => {
      console.error('Add user failed:', error)
      return of(addUserFailure({ error: error.message }))
    }),
  )
}, { functional: true })

export const deleteUserEffect$ = createEffect(() => {
  const actions$ = inject(Actions)
  const api = inject(UsersApiService)
  const localStorageService = inject(LocalStorageService)

  return actions$.pipe(
    ofType(deleteUser),
    switchMap(({ userId }) =>
      api.deleteUser(userId).pipe(
        map(() => {
          localStorageService.removeUser(userId)
          return deleteUserSuccess({ userId })
        }),
        catchError((error) => {
          console.error('Delete user failed:', error)
          return of(deleteUserFailure({ error: error.message }))
        }),
      ),
    ),
  )
}, { functional: true })
export const updateUser$ = createEffect(() => {
  const actions$ = inject(Actions)
  const localStorageService = inject(LocalStorageService)
  const api = inject(UsersApiService)

  return actions$.pipe(
    ofType(updateUser),
    switchMap(({ user }) => {
      return api.editUser(user).pipe(
        map((user: User) => {
          let users = localStorageService.getUsers() || []
          users = users.map(u => u.id === user.id ? user : u)
          localStorageService.setUsers(users)
          return updateUserSuccess({ user })
        }),
        catchError(error => {
          console.error('Edit user failed:', error)
          return of(updateUserFailure({ error: error.message }))
        }),
      )
    }),
  )
}, { functional: true })
