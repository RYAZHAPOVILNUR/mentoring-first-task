import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { UsersApiService } from "@services/users-api.service";
import * as UserActions from "@store/actions/user.actions";
import { UsersService } from "@services/users.service";
import { Store } from '@ngrx/store';
import { selectLoadUsers } from '@store/selectors/user.selectors';

@Injectable({
    providedIn: "root"
})
export class UserEffects {
    private readonly actions$ = inject(Actions);
    private readonly apiService = inject(UsersApiService);
    private readonly userService = inject(UsersService);
    private readonly store = inject(Store);

    public readonly loadUsersEffect = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            mergeMap(() => {
                const localStorageUsers = this.userService.getUsersFromLocalStorage();
                if (localStorageUsers.length > 0) {
                    return of(UserActions.loadUsersSuccess({ users: localStorageUsers }));
                } else {
                    return this.apiService.getUsersAPI().pipe(
                        map(users => {
                            this.userService.setUsersToLocalStorage(users);
                            return UserActions.loadUsersSuccess({ users });
                        }),
                        catchError(error => of(UserActions.loadUsersFailure({ error })))
                    );
                }
            })
        )
    );

    public readonly addUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUser),
            withLatestFrom(this.store.select(selectLoadUsers)),
            mergeMap(([action, users]) => {
                const newId = new Date().getTime();
                const updatedUsers = [...users, { ...action.user, id: newId }];
                this.userService.setUsersToLocalStorage(updatedUsers);
                return of(UserActions.loadUsersSuccess({ users: updatedUsers }));
            })
        )
    );

    public readonly updateUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            withLatestFrom(this.store.select(selectLoadUsers)),
            mergeMap(([action, users]) => {
                const updatedUsers = users.map(user => user.id === action.user.id ? action.user : user);
                this.userService.setUsersToLocalStorage(updatedUsers);
                return of(UserActions.loadUsersSuccess({ users: updatedUsers }));
            })
        )
    );

    public readonly deleteUserEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            withLatestFrom(this.store.select(selectLoadUsers)),
            mergeMap(([action, users]) => {
                const updatedUsers = users.filter(user => user.id !== action.id);
                this.userService.setUsersToLocalStorage(updatedUsers);
                return of(UserActions.loadUsersSuccess({ users: updatedUsers }));
            })
        )
    );
}
