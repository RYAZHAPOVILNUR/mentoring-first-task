import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getUsers, loadUsers } from "./users.actions";
import { UsersApiService } from "../services/users-api-service.service";
import { map, switchMap } from "rxjs";

@Injectable()
export class UsersEffects {

    loadUsers$ = createEffect(
        () => {
            const actions$ = inject(Actions);
            const usersApiService = inject(UsersApiService);
            return actions$.pipe(
                ofType(getUsers),
                switchMap(() => usersApiService.getUsers()
                    .pipe(
                        map(users => loadUsers({ users }))
                    )
                )
            )
        }, { functional: true }
    )
}