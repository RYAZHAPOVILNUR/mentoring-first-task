import { createAction, props } from '@ngrx/store';
import {IUser} from "../../interfaces/iuser";


export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: IUser[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>());

export const addUser = createAction('[Users] Add User', props<{ user: IUser }>());
export const updateUser = createAction('[Users] Update User', props<{ user: IUser }>());
export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());
