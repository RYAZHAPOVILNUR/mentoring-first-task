import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../../../services/usersApi.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersActions } from './user.actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersApi: UsersApiService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(() =>
        this.usersApi.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    )
  );
}
