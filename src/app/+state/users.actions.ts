import { createAction, props } from "@ngrx/store";
import { User } from '../../shared/interfaces/user.interface';

// Loading Users
export const initUsers = createAction('[Users Page] Init');
export const loadUsersSuccess =
  createAction('[Users/Api] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailed=
  createAction('[Users/Api] Load Users Failed', props<{ error: string }>());

// Delete User
export const deleteUser =
  createAction('[Users Page] Delete User', props<{ id: number }>());
export const deleteUserSuccess =
  createAction('[Users/Api] Delete User Success', props<{ id: number }>());
export const deleteUserFailed =
  createAction('[Users/Api, Delete User Failed]', props<{ error: string }>());

// Add User
export const addUser =
  createAction('[Users Page] Add User', props<{ userData: User }>());
export const addUserSuccess =
  createAction('[Users/Api] Add User Success', props<{ userData: User }>());
export const addUserFailed =
  createAction('[Users/Api] Add User Failed', props<{ error: string }>());

// Edit User
export const editUser =
  createAction('[Users Detail] Edit User', props<{userEdit: User}>());
export const editUserSuccess =
  createAction('[Users Detail] Edit User Success', props<{userEdit: User}>());
export const editUserFailed =
  createAction('[Users Detail] Edit User Failed', props<{error: string }>());
