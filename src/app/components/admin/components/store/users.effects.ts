import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {ApiService} from "../../services/api.service";
import {catchError, map, of, switchMap} from "rxjs";
import {User} from "../users-list/users-list.component";
import {UsersActions} from "./users.actions";


export const loadUsersEffect = createEffect( () => {
  const api = inject(ApiService)
  const actions$ = inject(Actions);
  console.log(1)
  return actions$.pipe(
    ofType(
      UsersActions.loadUser
    ),
    switchMap(() => {
      return api.getData().pipe(
        map((users: User[]) => {
          return UsersActions.set({users: users});
        }),
        catchError((error: string) => of(UsersActions.failureLoading({error: error})))
      )
    })
  )
},{functional: true});
