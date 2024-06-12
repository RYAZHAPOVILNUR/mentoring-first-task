import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { UsersApiService } from '../../services/users/users-api.service';
import {
    addUser,
    addUserSuccess,
    deleteUser,
    deleteUserSuccess,
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    showAlert,
    updateUser,
    updateUserSuccess,
} from './User.Action';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable()
export class UsersEffects {
    constructor(
        private action$: Actions,
        private service: UsersApiService,
        private localStorageService: LocalStorageService
    ) {}

    loadUsers$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(loadUsers),
                exhaustMap(action => {
                    return this.service.getUsers().pipe(
                        map(usersList => {
                            this.localStorageService.setItem(JSON.stringify(usersList));
                            return loadUsersSuccess({ usersList });
                        }),
                        catchError(_err => of(loadUsersFailure({ errormessage: _err.message })))
                    );
                })
            ),
        { functional: true }
    );

    addUser$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(addUser),
                switchMap(action => {
                    return this.service.createUser(action.inputData).pipe(
                        switchMap(() => {
                            return of(
                                addUserSuccess(),
                                showAlert({ message: 'User created', respType: 'pass' })
                            );
                        }),
                        catchError(_err =>
                            of(showAlert({ message: 'Failed to add', respType: 'fail' }))
                        )
                    );
                })
            ),
        { functional: true }
    );

    updateUser$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(updateUser),
                exhaustMap(action => {
                    return this.service.updateUser(action.inputData).pipe(
                        map(data => {
                            return updateUserSuccess();
                        }),
                        catchError(_err => of(loadUsersFailure({ errormessage: _err })))
                    );
                })
            ),
        { functional: true }
    );

    deleteUser$ = createEffect(
        () =>
            this.action$.pipe(
                ofType(deleteUser),
                exhaustMap(action => {
                    return this.service.deleteUser(action.id).pipe(
                        map(data => {
                            return deleteUserSuccess();
                        }),
                        catchError(_err => of(loadUsersFailure({ errormessage: _err })))
                    );
                })
            ),
        { functional: true }
    );
}
