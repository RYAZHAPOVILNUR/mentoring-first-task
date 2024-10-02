import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { loadUsers, loadUsersSuccess, loadUsersFailure, addUser, updateUser, deleteUser } from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {UsersService} from "../../services/users.service";
import {IUser} from "../../interfaces/iuser";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.usersService.loadUsers().pipe(
          map((users: IUser[]) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      mergeMap(({ user }) =>
        this.usersService.addUser(user).pipe(
          map(() => loadUsers()),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          map(() => loadUsers()),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ id }) =>
        this.usersService.deleteUser(id).pipe(
          map(() => loadUsers()),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );
}
