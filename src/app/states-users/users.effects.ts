import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { switchMap, catchError, of, map} from "rxjs";
import { UsersApiService } from "../../services/users-api-service.service";
import { getUsersList, getUsersListFailure, getUsersListSuccess } from "./users.actions";

export const getUsersListEffects = createEffect(
    () => {
        const actions$ = inject(Actions);
        const api = inject(UsersApiService);
        return actions$.pipe(
            ofType(getUsersList),
            switchMap(() => {
                return api.getUsers().pipe(
                    map(users => {
                        return getUsersListSuccess({users})
                    }),
                    catchError( error => {
                        return of(getUsersListFailure(error))
                    })
                )
            }
            )
        )
    }, {functional:true}
)