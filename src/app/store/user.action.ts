import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {IUser} from "../interface/user";
import {UsersError} from "./user.reducer";


export const UsersAction = createActionGroup({
  source: 'Users',
  events: {
    'loadUsers':            emptyProps(),
    'loadUsersSuccess':     props<{ users: IUser[] }>(),
    'loadUsersFailure':     props<{ error: UsersError | null }>(),

    'createUser':           props<{ user: IUser }>(),
    'createUserSuccess':    props<{ user: IUser }>(),
    'createUserFailure':    props<{ error: UsersError | null }>(),

    'deleteUser':           props<{ id: number }>(),
    'deleteUserSuccess':    props<{ id: number }>(),
    'deleteUserFailure':    props<{ error: UsersError | null }>(),


    'editUser':             props<{ updatedUser: IUser }>(),
    'editUserSuccess':      props<{ updatedUser: IUser }>(),
    'editUserFailure':      props<{ error: UsersError | null }>()
  }
})
