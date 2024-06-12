import { createAction, props } from '@ngrx/store';
import { User } from '../../../_model/users';

export const LOAD_USERS = '[user] load users';
export const LOAD_USERS_SUCCESS = '[user] load user success';
export const LOAD_USERS_FAIL = '[user] load user fail';

export const ADD_USER = '[user] add users';
export const ADD_USER_SUCCESS = '[user] add user success';

export const UPDATE_USER = '[user] update users';
export const UPDATE_USER_SUCCESS = '[user] update user success';

export const EDITED_USER = '[user] update users';
export const EDITED_USER_SUCCESS = '[user] update user success';

export const DELETE_USER = '[user] delete users';
export const DELETE_USER_SUCCESS = '[user] delete user success';

export const SHOW_ALERT = '[user] show alert';

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{ usersList: User[] }>());
export const loadUsersFailure = createAction(LOAD_USERS_FAIL, props<{ errormessage: string }>());

export const addUser = createAction(ADD_USER, props<{ inputData: User }>());
export const addUserSuccess = createAction(ADD_USER_SUCCESS);

export const updateUser = createAction(UPDATE_USER, props<{ inputData: User }>());
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS);

export const editedUser = createAction(EDITED_USER, props<{ editedUser: User }>());
export const editedUserSuccess = createAction(EDITED_USER_SUCCESS);

export const deleteUser = createAction(DELETE_USER, props<{ id: number }>());
export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);

export const showAlert = createAction(SHOW_ALERT, props<{ message: string; respType: string }>());
