import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersApiService } from '../../services/users/users-api.service';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './User.Action';

@Injectable()
export class UsersEffects {
    constructor(
        private action$: Actions,
        private service: UsersApiService
    ) {}

    loadUsers$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(loadUsers),
                exhaustMap(() => {
                    return this.service.getUsers().pipe(
                        map(users => {
                            return loadUsersSuccess({ users });
                        }),
                        catchError(_err => of(loadUsersFailure({ errormessage: _err.message })))
                    );
                })
            ),
        { functional: true }
    );
}
