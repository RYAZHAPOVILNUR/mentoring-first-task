import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../../../services/users-api.service";
import { UserActions } from "./users.actions";
import { catchError, map, of, switchMap } from "rxjs";


export const UserEffects = createEffect(() =>{
    const api = inject(UsersApiService);
    const actions$ = inject(Actions);

    return actions$.pipe(
        ofType(UserActions.load),
        switchMap(() => {
            return api.getUsers().pipe(
                map(users =>{
                    return UserActions.success({ users })
                } ),
                catchError(error => {
                    return of(UserActions.fail({ 
                    error: error.message || 'Ошибка загрузки пользователей' 
                }))})
            )
        })
    )   
},{functional: true})