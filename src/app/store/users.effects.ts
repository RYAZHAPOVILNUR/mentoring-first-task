import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersApiService } from '../services/users.api.service';
import { UsersActions } from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { uuidgen } from '../utils/id-generator.util';

@Injectable()
export class UsersEffects {
  private readonly UsersApiService = inject(UsersApiService);
  private readonly actions$ = inject(Actions);

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      mergeMap(() => {
        return this.UsersApiService.getUsers().pipe(
          map((users) => UsersActions.getUsersSuccess({ users })),
          catchError((error) => of(UsersActions.getUsersFailure({ error: error.message }))));
      })));

  addUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      mergeMap((action) => {
        return this.UsersApiService.addUser(action.user).pipe(
          map((user) => UsersActions.addUserSuccess({ user: { ...user, id: uuidgen() }})),
          catchError((error) => of(UsersActions.addUserFailure({ error: error.message }))));
      })));

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap((action) => {
        return this.UsersApiService.deleteUser(action.id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id: action.id })),
          catchError((error) => of(UsersActions.deleteUserFailure({ error: error.message }))));
      })));

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.editUser),
      mergeMap((action) => {
        return this.UsersApiService.editUser(action.userChanges).pipe(
          map(() => UsersActions.editUserSuccess({ userChanges: action.userChanges })),
          catchError((error) => of(UsersActions.editUserFailure({ error: error.message }))));
      })));
}
