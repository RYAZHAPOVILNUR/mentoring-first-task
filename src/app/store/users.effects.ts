import {
    Actions,
    createEffect,
    ofType
} from "@ngrx/effects";
import { inject } from "@angular/core";
import { UsersApiService } from "../services/users-api.service";
import { UsersActions } from "./users.actions";
import {
    catchError,
    map,
    of,
    switchMap
} from "rxjs";
import { IUser } from "../Interfaces/IUser";

export const loadUsers = createEffect(
    (action$ = inject(Actions), usersService: UsersApiService = inject(UsersApiService)) => {
        return action$.pipe(
            ofType(UsersActions.load),
            switchMap(() =>
                usersService.getUsers().pipe(
                    map((users: IUser[]) => UsersActions.loadSuccess({ users })),
                    catchError((error) => of(UsersActions.loadError({ error })))
                ))
        );
    },
    { functional: true }
)
