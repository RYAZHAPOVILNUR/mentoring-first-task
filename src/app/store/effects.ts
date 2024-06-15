import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, catchError } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import * as UsersActions from "./actions";
import { IUser } from "../user";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private http: HttpClient) { }

  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() =>
        this.http.get<IUser[]>('https://jsonplaceholder.typicode.com/users').pipe(
          map(users => UsersActions.getUsersSuccess({ users: users })),
          catchError(error => of(UsersActions.getUsersFailure({ error: error.message })))
        )
      )
    )
  );
}