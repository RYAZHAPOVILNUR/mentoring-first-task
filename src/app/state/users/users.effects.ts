import { Actions, createEffect, ofType } from '@ngrx/effects'
import { inject } from '@angular/core'
import { UsersApiService } from '../../services/users-api.service'
import * as UsersActions from './users.actions'
import { map, switchMap, catchError, of } from 'rxjs'
import { User } from '../../types/user.types'

export const usersEffects = createEffect(
  () => {
    const actions$ = inject(Actions)
    const apiService = inject(UsersApiService)

    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        apiService.getUsers().pipe(map((users: User[]) => UsersActions.loadUsersSuccess({ users })))
      ),
      catchError((error) => of(UsersActions.loadUsersFailed({ error })))
    )
  },
  { functional: true }
)
