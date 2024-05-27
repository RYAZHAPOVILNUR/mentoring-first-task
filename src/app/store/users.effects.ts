import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { UsersApiService } from "../services/users-api.service";
import { loadUsers } from "./users.actions";

@Injectable()
export class UsersEffect {
    private actions$ = inject(Actions);
    private userApi = inject(UsersApiService);

    public loadUsers$ = createEffect(() => 
        this.actions$.pipe(
            ofType('[Users Component] GetUsers'),
            switchMap(
                () => this.userApi.getUsers.pipe(
                    map((users) => loadUsers({newUsers:users})),
                    catchError(() => EMPTY)
                )
            )
        )
    )

}