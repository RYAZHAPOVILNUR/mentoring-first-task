import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserApiService } from '../services/users-api.service';
import { loadUsers, loadUserFailure, loadUserSuccess } from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../user.model';


export const loadUserEffect = createEffect(
  () => {
    const api = inject(UserApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        api.getUsers().pipe(
          map((users: User[]) => loadUserSuccess({ users })),
          catchError((error) => of(loadUserFailure({ error: error.message })))
        )
      )
    );
  },
  { functional: true }
);
