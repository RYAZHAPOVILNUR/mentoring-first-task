import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {UsersApiService} from "../../services/users-api.service";
import {UsersActions} from "./users.action";
import {catchError, map, mergeMap, of, switchMap} from "rxjs";
import {User} from "../../models/user";
import {Store} from "@ngrx/store";
import {selectUsers} from "./users.selector";


export const loadUserEffect = createEffect(() => {
  const actions$ = inject(Actions);
  const ApiService = inject(UsersApiService);
  const store = inject(Store);

  return actions$.pipe(
    ofType(UsersActions.loadUser),
    mergeMap(() =>
      store.select(selectUsers).pipe(
        switchMap((users) => {
          if (users.length === 0) {
            return ApiService.getUsers().pipe(
              map((users: User[]) => UsersActions.setUsers({ users })),
              catchError((error: string) => of(UsersActions.failureLoading({ error })))
            );
          } else {
            // Если данные уже есть в Store, возвращаем пустой observable
            return of();
          }
        })
      )
    )
  );
}, { functional: true });


