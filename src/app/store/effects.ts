import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as UsersActions from "./actions";
import { mergeMap, of, Observable, catchError } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../user";

@Injectable()
export class UsersEffects {

    actions$ = inject(Actions);

    getPosts$ = createEffect(() => {
        return this.actions$.pipe(ofType(UsersActions.getUsers),
            mergeMap(() => {
                //posts$ might represent a call to a service that returns an observable -- similar to a response from an API
                const users$: Observable<IUser[]> = of([
                    {
                        id: 1,
                        name: "Leanne Graham",
                        username: "Bret",
                        email: "Sincere@april.biz",
                        phone: "1-770-736-8031 x56442",

                    },
                    {
                        id: 2,
                        name: "Ervin Howell",
                        username: "Antonette",
                        email: "Shanna@melissa.tv",
                        phone: "010-692-6593 x09125",

                    },
                ]); //service
                return users$.pipe(map((users) => {
                    return UsersActions.getUsersSuccess({ users });
                }),
                    catchError((error) => of(UsersActions.getUsersFailure({ error: error.message })))
                );//endof pipe
            }));
    });


}