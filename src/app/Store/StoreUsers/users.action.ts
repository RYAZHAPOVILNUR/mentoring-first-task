import {createAction, createActionGroup, props} from "@ngrx/store";
import {User} from "../../models/user";


export const UsersActions = createActionGroup({
  source: "UsersActions",
  events: {
    "loadUser": props<{text: string}>(),
    "setUsers": props<{users: User[]}>(),
    "deleteUser": props<{userId: number}>(),
    "createUser": props<{user: User}>(),
    "editUser": props<{editedUser: User}>(),
    "failure loading": props<{error: string}>()
  }
});
