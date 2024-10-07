import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, exhaustMap} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {UsersApiService} from "../users-list/users-api.service";

@Injectable()
export class UsersEffects {

  private actions$ = inject(Actions)
  private usersApiService = inject(UsersApiService)

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType('Load Users'),
      mergeMap(() => {
        return this.usersApiService.loadUsers().pipe(
          map((users) => ({type: 'Load Users Success', users: users })),
          catchError(() => EMPTY)
        );
      })
    )
  );

}
