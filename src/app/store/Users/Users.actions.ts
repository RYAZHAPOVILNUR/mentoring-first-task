import {createAction, createActionGroup, emptyProps, props} from "@ngrx/store";
import {IUser} from "../../models/user.interface";

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Get Users': emptyProps(),
    'Get Users Success': props<{ users: IUser[] }>(),
    'Get Users Failure': props<{ error: string }>(),

    'Add User': props<{ user: IUser }>(),
    'Add User Success': props<{ user: IUser }>(),
    'Add User Failure': props<{ error: string }>(),

    'Edit User': props<{ userChanges: IUser }>(),
    'Edit User Success': props<{ userChanges: IUser }>(),
    'Edit User Failure': props<{ error: string }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: string }>(),
  },
})
