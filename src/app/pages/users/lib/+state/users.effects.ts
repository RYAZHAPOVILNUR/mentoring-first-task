import { inject } from '@angular/core'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { usersActions } from './users.actions'
import { catchError, map, of, switchMap, tap } from 'rxjs'
import { UsersApi } from '../../services/users-api.service'
import { LocalStorageService } from '../../services/local-storage.service'

export const usersEffect = createEffect(
	() => {
		const actions$ = inject(Actions)
		const usersApi = inject(UsersApi)
		const localStorageService = inject(LocalStorageService)

		return actions$.pipe(
			ofType(usersActions.getUsers),
			switchMap(() =>
				usersApi.getUsers().pipe(
					map(users => usersActions.getUsersSuccess({ users: users.map(user => user) })),
					tap(users => localStorageService.setItem('usersList', users.users)),
					catchError(error => {
						console.error('Error', error)
						return of(usersActions.getUsersFailure({ error }))
					})
				)
			)
		)
	},
	{ functional: true }
)
