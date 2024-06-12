import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BehaviorSubject, catchError, map, of, switchMap } from "rxjs";
import { UsersApiService } from "@app/services/users-api.service";
import * as UsersActions from "@app/store/users.actions";
import { LocalStorageService } from "@app/services/local-storage.service";
import { User } from "@app/models/user.interface";

export const loadUsersEffect = createEffect(
    () => {
        const action$ = inject(Actions);
        const usersApiService = inject(UsersApiService);
        const localStorageService = inject(LocalStorageService);
        const getLocalStorage = localStorageService.getItem();

        return action$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(() => { 
                if(getLocalStorage) {
                    const local$ = new BehaviorSubject<User[]>(getLocalStorage).asObservable();
                    return local$.pipe(
                        map(users => UsersActions.loadUsersSuccess({ users }))
                    )
                } else {
                    return usersApiService.getUsersApi().pipe(
                    map(users => UsersActions.loadUsersSuccess({ users })),
                    catchError(error => of(UsersActions.loadUsersFailure({ error })))
                    )
                }
            })
        );
    }, { functional: true }
);

export const addUserEffect = createEffect(
    () => {
        const action$ = inject(Actions);
        const usersApiService = inject(UsersApiService);
        
        return action$.pipe(
            ofType(UsersActions.addUser), 
            switchMap(({ addedUser }) => {
                return usersApiService.postUserApi(addedUser).pipe(
                    map(addedUser => UsersActions.addUserSuccess({ addedUser })),
                    catchError(error => of(UsersActions.addUserFailure({ error })))
                );
            })
        );
    }, { functional: true }
);

export const updateUserEffect = createEffect(
    () => {
        const usersApiService = inject(UsersApiService);
        const action$ = inject(Actions);

        return action$.pipe(
            ofType(UsersActions.updateUser),
            switchMap(({ updatedUser }) => {
                return usersApiService.putUserApi(updatedUser).pipe(
                    map(updatedUser => UsersActions.updateUserSuccess({ updatedUser })),
                    catchError(error => of(UsersActions.updateUserFailure({ error })))
                );
            })
        );
    }, { functional: true }
);

export const deleteUserEffect = createEffect(
    () => {
        const usersApiService = inject(UsersApiService);
        const action$ = inject(Actions);
        
        return action$.pipe(
            ofType(UsersActions.deleteUser),
            switchMap(({ user }) => {
                return usersApiService.deleteUserAPI(user).pipe(
                    map(() => UsersActions.deleteUserSuccess({ user })),
                    catchError(error => of(UsersActions.deleteUserFailure({ error })))   
                );   
            })
        );
    }, { functional: true }
);