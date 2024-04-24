import { inject } from "@angular/core";
import { UserApiService } from "../../services/user-api.service";
import * as usersActions from './users.actions'
import { map, of, switchMap } from "rxjs";
import { USERS_FEATURE_KEY } from "./users.reducers";
import { UsersLocalStorageService } from "../../services/users-local-storage.services";
import { Actions, createEffect, ofType } from "@ngrx/effects";


export const getUsers$ = createEffect(
    () => {
        const actions$ = inject(Actions);
        const userApiService = inject(UserApiService);
        const usersLocalService = inject(UsersLocalStorageService)
        return actions$.pipe(
            ofType(usersActions.getUsers),
            switchMap(() => {
                const usersFromLocalStorage = usersLocalService.getLocalStorageUsers(USERS_FEATURE_KEY);
                if (usersFromLocalStorage) {
                    return of(usersActions.getUsersSuccess({ users: usersFromLocalStorage }))
                } else {
                    return userApiService.getUsers().pipe(
                        map((users => {
                            usersLocalService.setLocalStorageUsers(USERS_FEATURE_KEY, users)
                            return usersActions.getUsersSuccess({ users })
                        }))
                    )
                }
            }
            )
        )
    }, { functional: true })
