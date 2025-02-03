import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersApiService } from '../../services/users-api.service';
import { User } from '../../models/user.interface';
import { UserActions } from './users.actions';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType('[Users Page] Load Users'),
    exhaustMap(() => this.usersApiServices.getUsers().pipe(
      map((users: User[]) => UserActions.set({ users })),
      catchError(error => of(UserActions.error({ error: error.message })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private usersApiServices: UsersApiService,
  ) {}
}