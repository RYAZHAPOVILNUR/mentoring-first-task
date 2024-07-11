import { createAction, props } from '@ngrx/store';
import { User } from '../data/intefaces/user.interface';

export const loadUserData = createAction('[Users] Load User Data');
export const loadUserDataSuccess = createAction(
  '[Users] Load User Data Success',
  props<{ users: User[] }>()
);
export const loadUserDataFailure = createAction(
  '[Users] Load User Data Failure',
  props<{ error: string }>()
);
export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);
export const createUser = createAction(
  '[Users] Create User',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);
