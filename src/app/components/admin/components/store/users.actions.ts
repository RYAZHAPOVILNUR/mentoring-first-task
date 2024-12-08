import {createAction, createActionGroup, props} from "@ngrx/store";
import {User} from "../users-list/users-list.component";
import {Observable} from "rxjs";


export const UsersActions = createActionGroup({
  source: "Users",
  events: {
    "set": props<{users: User[]}>(),
    "edit": props<{user: User}>(),
    "create": props<{user: User}>(),
    "delete": props<{id: number}>(),
    "searchByName": props<{name: string}>(),
    "deleteAll": props<{name: string}>(),
    "loadUser": props<{str: string}>(),
    "failureLoading": props<{error: string}>(),
  }
})
