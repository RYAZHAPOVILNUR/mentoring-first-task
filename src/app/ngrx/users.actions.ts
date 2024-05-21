import { createAction, props } from '@ngrx/store';
import { UserEntity } from '../entities/UserEntity';

export const loadUsers = createAction('[Users Component] Load Users');
export const loadUsersSuccess = createAction(
  '[Users/Api] Load Users Success',
  props<{users: UserEntity[]}>()
);
export const loadUsersFailed = createAction(
  '[Users/Api] Load Users Failed',
  props<{error: Error}>()
);

export const addUser = createAction(
  '[Users Component] Add User',
  props<{userData: UserEntity}>()
);

export const editUser = createAction(
  '[Users Component] Edit User',
  props<{userData: UserEntity}>()
);

export const deleteUser = createAction(
  '[Users Component] Delete User',
  props<{id: number}>()
);
