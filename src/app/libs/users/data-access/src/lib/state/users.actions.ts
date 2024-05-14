import { createAction, props } from "@ngrx/store";
import { IUser } from "../../../../../../shared/models/user.models";
import { UsersActionTypes } from "./users.models";

// Loading Users
export const loadUsers = createAction(UsersActionTypes.LoadUsers);
export const loadUsersSuccess = createAction(UsersActionTypes.LoadUsersSuccess, props<{ users: IUser[] }>());
export const loadUsersFailure = createAction(UsersActionTypes.LoadUsersFailure, props<{ error: string }>());

// Delete User
export const deleteUser = createAction(UsersActionTypes.DeleteUser, props<{ id: number }>());
export const deleteUserSuccess = createAction(UsersActionTypes.DeleteUsersSuccess, props<{ id: number }>());
export const deleteUserFailure = createAction(UsersActionTypes.DeleteUsersFailure, props<{ error: string }>());

// Add User
export const addUser = createAction(UsersActionTypes.AddUser, props<{ user: IUser }>());
export const addUserSuccess = createAction(UsersActionTypes.AddUserSuccess, props<{ user: IUser }>());
export const addUserFailure = createAction(UsersActionTypes.AddUserFailure, props<{ error: string }>());

// Edit User
export const editUser = createAction(UsersActionTypes.EditUser, props<{ user: IUser }>());
export const editUserSuccess = createAction(UsersActionTypes.EditUserSuccess, props<{ user: IUser }>());
export const editUserFailure = createAction(UsersActionTypes.EditUserFailure, props<{ error: string }>());

// Set Users
export const setUsers = createAction(UsersActionTypes.SetUsers, props<{ users: IUser[] }>());
export const setUsersSuccess = createAction(UsersActionTypes.SetUsersSuccess, props<{ users: IUser[] }>());
export const setUsersFailure = createAction(UsersActionTypes.SetUsersFailure, props<{ error: string }>());
