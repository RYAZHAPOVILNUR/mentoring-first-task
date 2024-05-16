import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from './users.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersApiService } from "../users-api-service.service";

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.getUsers), 
      mergeMap(()=>{
        return this.usersApiService
          .getUsers()
          .pipe(map((users) => UsersActions.getUsersSuccess({ users })
        ), 
          catchError((error => of(UsersActions.getUsersFailure({error: error.message})))));
      })
    )
  );
  constructor(private action$: Actions, private usersApiService: UsersApiService){}
}

// import { inject } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { catchError, map, of, switchMap, tap } from "rxjs";
// import { UsersApiService } from "../../../../../../shared/services/users-api.service";
// import * as UsersActions from './users.actions';
// import { LocalStorageService } from "../../../../../../shared/services/local-storage.service";

// // Loading Users
// export const loadUsersEffects = createEffect(
//   () => {
//     const actions$ = inject(Actions);
//     const apiService = inject(UsersApiService);
//     const localStorageService = inject(LocalStorageService);

//     return actions$.pipe(
//       ofType(UsersActions.loadUsers),
//       switchMap(() =>
//         apiService.getUsers().pipe(
//           map((users) => UsersActions.loadUsersSuccess({ users })),
//           tap((data) => localStorageService.setItem('users', JSON.stringify(data.users))),
//           catchError((error: { message: string }) =>
//             of(UsersActions.loadUsersFailure({ error: error.message }))
//           )
//         )
//       ),
//     );
//   },
//   { functional: true }
// );

// Delete User
export const deleteUserEffects = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(UsersActions.deleteUser),
      map(({ id }) => UsersActions.deleteUserSuccess({ id })),
      catchError((error: { message: string }) =>
        of(UsersActions.deleteUserFailure({ error: error.message }))
      )
    );
  },
  { functional: true }
);

// Add User
export const addUserEffects = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(UsersActions.addUser),
      map(({ user }) => UsersActions.addUserSuccess({ user })),
      catchError((error: { message: string }) =>
        of(UsersActions.addUserFailure({ error: error.message }))
      )
    );
  },
  { functional: true }
);

// Edit User
export const editUserEffects = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(UsersActions.editUser),
      map(({ user }) => UsersActions.editUserSuccess({ user })),
      catchError((error: { message: string }) =>
        of(UsersActions.editUserFailure({ error: error.message }))
      )
    );
  },
  { functional: true }
);

// Set User
export const setUsersEffects = createEffect(
  () => {
    const actions$ = inject(Actions);

    return actions$.pipe(
      ofType(UsersActions.setUsers),
      map(({ users }) => UsersActions.setUsersSuccess({ users })),
      catchError((error: { message: string }) =>
        of(UsersActions.setUsersFailure({ error: error.message }))
      )
    );
  },
  { functional: true }
);