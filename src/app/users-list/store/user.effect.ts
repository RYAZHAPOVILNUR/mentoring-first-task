import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersActions } from './user.actions';
import { UsersApiService } from '../../users-api.service';
import { User } from '../../interfaces/users.interface';

export const loadUsers$ = createEffect(
  (
    actions$: Actions = inject(Actions),
    usersApiService: UsersApiService = inject(UsersApiService),
  ) =>
    actions$.pipe(
      ofType(UsersActions.load),
      switchMap(() =>
        usersApiService.getUsers().pipe(
          map((users: User[]) => UsersActions.loadSuccess({ users })),
          catchError(() =>
            of(UsersActions.loadFailure({ error: 'Ошибка загрузки' })),
          ),
        ),
      ),
    ),
  { functional: true },
);
