import { createAction, props } from "@ngrx/store";
import { UsersActionTypes } from "./users.models";
import { TUserEntity } from "../../../../../core/data-access/src/lib/users-data.models";

// Loading Users
export const loadUsers = createAction(UsersActionTypes.LoadUsers);
export const loadUsersSuccess = createAction(UsersActionTypes.LoadUsersSuccess, props<{ users: TUserEntity[] }>());
export const loadUsersFailure = createAction(UsersActionTypes.LoadUsersFailure, props<{ error: string }>());

// Delete User
export const deleteUser = createAction(UsersActionTypes.DeleteUser, props<{ id: number }>());
export const deleteUserSuccess = createAction(UsersActionTypes.DeleteUsersSuccess, props<{ id: number }>());
export const deleteUserFailure = createAction(UsersActionTypes.DeleteUsersFailure, props<{ error: string }>());

// Add User
export const addUser = createAction(UsersActionTypes.AddUser, props<{ user: TUserEntity }>());
export const addUserSuccess = createAction(UsersActionTypes.AddUserSuccess, props<{ user: TUserEntity }>());
export const addUserFailure = createAction(UsersActionTypes.AddUserFailure, props<{ error: string }>());

// Edit User
export const editUser = createAction(UsersActionTypes.EditUser, props<{ user: TUserEntity }>());
export const editUserSuccess = createAction(UsersActionTypes.EditUserSuccess, props<{ user: TUserEntity }>());
export const editUserFailure = createAction(UsersActionTypes.EditUserFailure, props<{ error: string }>());

// Set Users
export const setUsers = createAction(UsersActionTypes.SetUsers, props<{ users: TUserEntity[] }>());
export const setUsersSuccess = createAction(UsersActionTypes.SetUsersSuccess, props<{ users: TUserEntity[] }>());
export const setUsersFailure = createAction(UsersActionTypes.SetUsersFailure, props<{ error: string }>());
