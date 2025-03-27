import { createAction, props } from "@ngrx/store";
import { User } from "../../interfaces/users";

export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string | null }>());

export const createUser = createAction('[User] Create User', props<{ user: User }>());

export const editUser = createAction('[User] Edit User', props<{ user: User }>());

export const deleteUser = createAction('[User] Delete User', props<{ id: number }>());
