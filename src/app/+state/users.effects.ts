import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getUsers, getUsersSuccess, getUsersFailure, deleteUser, deleteUserSuccess, deleteUserFailure, editUser, editUserSuccess, editUserFailure, createUser, createUserSuccess, createUserFailure, returnUsers, returnUsersSuccess, returnUsersFailure } from './users.action'
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../service/users.service';

@Injectable()
export class UserEffects{
    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ){}
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getUsers),
            mergeMap(() =>
                this.usersService.loadUser().pipe(
                    map(users => getUsersSuccess({users})),
                    catchError(error => of(getUsersFailure({error: error.message})))
                )
            )
        )
    )

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            mergeMap(action =>
                this.usersService.deleteUser(action.userId).pipe(
                    map(() => deleteUserSuccess({ userId: action.userId })),
                    catchError(error => of(deleteUserFailure({ error: error })))
                )
            )
        )
    );

    editUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(editUser),
            mergeMap(action => 
                this.usersService.editUser(action.user).pipe(
                    map(user => editUserSuccess({ user })),
                    catchError(error => of(editUserFailure({ error: error.message })))
                )
            )
        )
    );

    createUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(createUser),
            mergeMap(action =>
                this.usersService.createUser(action.user).pipe(
                    map(user => createUserSuccess({ user })),
                    catchError(error => of(createUserFailure({ error: error.message })))
                )
            )
        )
    );

    returnUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(returnUsers),
            mergeMap(() => 
                this.usersService.returnUser().pipe(
                    map(users => returnUsersSuccess({ users })),
                    catchError(error => of(returnUsersFailure({ error: error.message })))
                )
            )
        )
    );
}