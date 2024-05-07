import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {
  loadUserAction,
  loadUserActionSuccess,
  loadUserActionFailure,
} from './users.action'
import {UsersApiService} from '../services/usersApiService.service'

@Injectable()
export class UsersEffect {
  constructor(
    private action$: Actions,
    private api: UsersApiService,
  ) {}

  loadUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadUserAction),
      switchMap(() =>
        this.api.getUsers().pipe(
          map((users) => loadUserActionSuccess({users})),
          catchError((error) =>
            of(loadUserActionFailure({errorMessage: error.message})),
          ),
        ),
      ),
    ),
  )
}
