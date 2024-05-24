import { createAction, props } from "@ngrx/store";
import { User } from "../interface/users.interface";


export const getUsers = createAction('[Users] Get Users');
export const getUsersSuccess = createAction('[Users] Get Users Success', props<{ users: User[] }>());
export const getUsersFailure = createAction('[Users] Get Users Failure', props<{ error: string }>());

export const deleteUser = createAction('[Users] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success' , props<{ userId: number }>());
export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{ error: string }>());

export const editUser = createAction('[Users] Edit User', props<{ user: User}>());
export const editUserSuccess = createAction('[Users] Edit User Success', props<{ user: User }>());
export const editUserFailure = createAction('[Users] Edit User Failure', props<{ error: string}>())

export const createUser = createAction('[Users] Create User', props<{ user: User }>());
export const createUserSuccess = createAction('[Users] Create User Success', props<{ user: User }>());
export const createUserFailure = createAction('[Users] Create User Failure', props<{ error: string }>());

export const returnUsers = createAction('[Users] Return Users')
export const returnUsersSuccess = createAction('[Users] Return Users Success', props<{ users: User[] }>())
export const returnUsersFailure = createAction('[Users] Return Users Failure', props<{ error: string }>())