import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersApiService } from '../../services/users-api.service';
import * as UserActions from './users.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersApiService: UsersApiService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.usersApiService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
