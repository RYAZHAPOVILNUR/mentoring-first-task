import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { UsersApiService } from "../services/users-api.service";
import * as UsersActions from './users.actions';
import { catchError, map, of, switchMap } from "rxjs";

export const loadUsers = createEffect(
  (actions$ = inject(Actions), apiService = inject(UsersApiService) ) => {
    return actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(
        () => apiService.users.pipe(
          map((users) => UsersActions.loadUsersSuccess({users})),
          catchError((error) => {
            return of(UsersActions.loadUsersFailed(error));
          })
        )
      )
    )
  }, {functional: true}
)