import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from './users.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsersApiService } from "../users-api-service.service";

@Injectable()
export class UsersEffects {
  getUsers$ = createEffect(() =>
    this.action$.pipe(
      ofType(UsersActions.getUsers), 
      mergeMap(()=>{
        return this.usersApiService
          .getUsers()
          .pipe(map((users) => UsersActions.getUsersSuccess({ users })
        ), 
          catchError((error => of(UsersActions.getUsersFailure({error: error.message})))));
      })
    )
  );
  constructor(private action$: Actions, private usersApiService: UsersApiService){}
}