// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import * as GetAction from './user.action'
// import { UserApiService } from "../service/userApiService";
// import { inject } from "@angular/core";
// import { catchError, map, of, switchMap } from "rxjs";
// Injectable({
//     providedIn: 'root'
// }
// )
// export class UserEffect{
//  constructor(private actions$: Actions, private userApiService: UserApiService){}

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { UserApiService } from '../service/userApiService';
import { catchError, map, of, switchMap } from 'rxjs';
import * as GetAction from './user.action';

export const loadUserEffect = createEffect(
  () => {
    const actions$ = inject(Actions);
    const api = inject(UserApiService);
    return actions$.pipe(
      ofType(GetAction.actionLoading),
      switchMap(() => {
        return api.getUsers().pipe(
          map((users) => {
            return GetAction.actionGetUser({ users });
          }),
          catchError((error) => {
            return of(GetAction.actionError({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
