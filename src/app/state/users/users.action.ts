import { createAction, props } from "@ngrx/store";
import { IUser } from "@models/user.model";

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: IUser[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userToDelete: IUser }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userToDelete: IUser }>()
);

export const deleteUserFailuer = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Users] Create User',
  props<{ userData: IUser }>()
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ userData: IUser }>()
);
export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: string }>()
);

export const editUser = createAction(
  '[Users] Edit User',
  props<{ userToEdit: IUser }>()
);

export const editUserSuccess = createAction(
  '[Users] Edit User Success',
  props<{ userToEdit: IUser }>()
);

export const editUserFailure = createAction(
  '[Users] Edit User Failure',
  props<{ error: string }>()
);
