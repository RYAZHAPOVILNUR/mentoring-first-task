import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const loadUsers = createAction('[User List] Load Users');

export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[User List] Load Users Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[User List] Delete User',
  props<{ userId: number }>()
);

export const addUser = createAction(
  '[User List] Add User',
  props<{ newUser: User }>()
);

export const editUser = createAction(
  '[User List] Edit User',
  props<{ editUser: User }>()
);
