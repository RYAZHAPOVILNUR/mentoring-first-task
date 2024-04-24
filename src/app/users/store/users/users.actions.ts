import { createAction, props } from "@ngrx/store";
import { User } from "../../modules/interfaces/user.interface";

export const getUsers = createAction(
    '[users] Get Users'
)
export const getUsersSuccess = createAction(
    '[users] Get Users Success', props<{ users: User[] }>()
)

export const createUser = createAction(
    '[users] Create User'
)

export const createUserSuccess = createAction(
    '[users] Create User Success', props<{ user: User }>()
)

export const deleteUser = createAction(
    '[users] Delete User'
)

export const deleteUserSuccess = createAction(
    '[users] Delete User Success', props<{ id: number }>()
)

export const editUser = createAction(
    '[users] Edit User'
)

export const editUserSuccess = createAction(
    '[users] Edit User Success', props<{ user: User }>()
)
