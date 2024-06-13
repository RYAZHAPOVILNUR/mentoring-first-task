import { createAction, props } from '@ngrx/store';
import { User } from '../../../_model/users';

export const LOAD_USERS = '[user] load users';
export const LOAD_USERS_SUCCESS = '[user] load user success';
export const LOAD_USERS_FAIL = '[user] load user fail';

export const CREATE_USER = '[user] create users';
export const CREATE_USER_SUCCESS = '[user] create user success';

export const EDITED_USER = '[user] edited users';
export const EDITED_USER_SUCCESS = '[user] edited user success';

export const REMOVE_USER = '[user] delete users';
export const REMOVE_USER_SUCCESS = '[user] delete user success';

export const loadUsers = createAction(LOAD_USERS);
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{ users: User[] }>());
export const loadUsersFailure = createAction(LOAD_USERS_FAIL, props<{ errormessage: string }>());

export const createUser = createAction(CREATE_USER);
export const createUserSuccess = createAction(CREATE_USER_SUCCESS, props<{ user: User }>());

export const editedUser = createAction(EDITED_USER);
export const editedUserSuccess = createAction(EDITED_USER_SUCCESS, props<{ user: User }>());

export const removeUser = createAction(REMOVE_USER);
export const removeUserSuccess = createAction(REMOVE_USER_SUCCESS, props<{ id: number }>());
