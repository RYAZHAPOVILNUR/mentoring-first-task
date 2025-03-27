import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersApiService } from "../../services/users-api-service.service";
import * as UsersActions from "./users.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class UsersEffects {
    private $actions = inject(Actions);
    private userApiService = inject(UsersApiService);

    loadUsers = createEffect(() =>
    this.$actions.pipe(
        ofType(UsersActions.loadUsers),
        mergeMap(()=>
            this.userApiService.getUsers().pipe(
                map((users) => UsersActions.loadUsersSuccess({users})),
                catchError((error) => of(UsersActions.loadUsersFailure({error})))
            ))
        )
    );
}
