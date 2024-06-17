import { createAction, props } from '@ngrx/store';
import { User } from '../model/user';

export const initUsers = createAction('[Users Page] Init');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }>(),
);

export const loadUsersFailure = createAction(
  '[Users/API] Load Users Failure',
  props<{ error: any }>(),
);

export const deleteUser = createAction(
  '[Users Page] Delete User',
  props<{ id: number }>(),
);

export const deleteUserSuccess = createAction(
  '[Users/API] Delete User Success',
  props<{ id: number }>(),
);

export const deleteUserFailure = createAction(
  '[Users/API] Delete User Failed',
  props<{ error: any }>(),
);

export const addUser = createAction(
  '[Users Page] Add User',
  props<{ userData: User }>(),
);

export const addUserSuccess = createAction(
  '[Users/API] Add User Success',
  props<{ userData: User }>(),
);

export const addUserFailure = createAction(
  '[Users/API] Add User Failed',
  props<{ error: any }>(),
);

export const editUser = createAction(
  '[Users/API] Edite User',
  props<{ userData: User }>(),
);

export const editUserSuccess = createAction(
  '[Users/API] Edit User Success',
  props<{ userData: User }>(),
);

export const editUserFailure = createAction(
  '[Users/API] Edit User Failed',
  props<{ error: any }>(),
);
