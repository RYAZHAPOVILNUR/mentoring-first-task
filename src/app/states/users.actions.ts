import {createAction, props} from "@ngrx/store";
import {User} from "../types/user.types";

export const loadUsers = createAction('[Users Page] Load Users');

export const loadUsersSuccess = createAction(
  '[Users/API] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[Users/API] Load Users Fail',
  props<{ error: any }>()
);

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: number }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{updatedUser: User}>()
);
