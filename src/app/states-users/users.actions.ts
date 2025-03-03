import { createAction, props } from '@ngrx/store';
import { User } from '../interfaces/user.interface'

//******* Get Users List *******//
export const getUsersList = createAction('[Users] Get Users List');   // в [] указывается домен где action произошел, а потом что произошло
export const getUsersListSuccess = createAction('[Users] Get Users List Success', props<{ users: User [] }>());   // в props передаются в action какие-то данные, что бы он сработал
export const getUsersListFailure = createAction('[Users] Get Users List Failure', props<{ error: string}>());

//******* Delete User *******//
export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());

//******* Get User *******//
export const getUser = createAction('[Users] Get User', props<{ id: number }>())

//******* Edit User *******//
export const editUser = createAction('[Users] Edit User', props<{ user: User }>());
export const editUserSuccess = createAction('[Users] Edit User Success', props<{ user: User}>());
export const editUserFailure = createAction('[Users] Edit User Failure', props<{ error: string}>());

//******* Add User () *******//
export const addUser = createAction('[Users] Add User', props<{ user: User }>());