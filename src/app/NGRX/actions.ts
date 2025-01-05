import { createAction, props } from '@ngrx/store';
import { User } from '../user.model';

export const addUser = createAction('[User] Add User', props<{ user: User }>());

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const editUser = createAction(
  '[User] Edit User',
  props<{ editedUser: User }>()
);

export const loadUsers = createAction('[User] Load Users');

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ users: User[] }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);

export const setUsers = createAction(
  '[User] Set Users',
  props<{ users: User[] }>()
);

export const UserActions = {
  addUser,
  deleteUser,
  setUsers,
  editUser,
  loadUsers,
  loadUserSuccess,
  loadUserFailure,
};
