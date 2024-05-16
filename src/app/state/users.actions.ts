import { createAction, props } from "@ngrx/store";
import { User } from "../user.model";
import { UsersActionTypes } from "./types/users.model";

export const getUsers = createAction(
  '[Users] Get Users'
);
export const getUsersSuccess = createAction(
  '[Users] Get Users Success', 
  props<{ users: User[] }>()
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(UsersActionTypes.DeleteUser, props<{ id: number }>());
export const deleteUserSuccess = createAction(UsersActionTypes.DeleteUsersSuccess, props<{ id: number }>());
export const deleteUserFailure = createAction(UsersActionTypes.DeleteUsersFailure, props<{ error: string }>());

// Add User
export const addUser = createAction(UsersActionTypes.AddUser, props<{ user: User }>());
export const addUserSuccess = createAction(UsersActionTypes.AddUserSuccess, props<{ user: User }>());
export const addUserFailure = createAction(UsersActionTypes.AddUserFailure, props<{ error: string }>());

// Edit User
export const editUser = createAction(UsersActionTypes.EditUser, props<{ user: User }>());
export const editUserSuccess = createAction(UsersActionTypes.EditUserSuccess, props<{ user: User }>());
export const editUserFailure = createAction(UsersActionTypes.EditUserFailure, props<{ error: string }>());

// Set Users
export const setUsers = createAction(UsersActionTypes.SetUsers, props<{ users: User[] }>());
export const setUsersSuccess = createAction(UsersActionTypes.SetUsersSuccess, props<{ users: User[] }>());
export const setUsersFailure = createAction(UsersActionTypes.SetUsersFailure, props<{ error: string }>());