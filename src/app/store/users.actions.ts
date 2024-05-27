import { createAction, props } from "@ngrx/store";
import { IUser } from "../types/users.interfase";

export const getUsers = createAction('[Users Component] GetUsers');
export const loadUsers = createAction('[Users Component] LoadUsers',props<{ newUsers: IUser[] }>());
export const addUser = createAction('[Users Component addUsers',props<{ newUsers:IUser }>());
export const editUser = createAction('[Users Component editUsers',props<{ user:IUser }>());
export const deleteUser = createAction('[Users Component deleteUser]', props<{id:number}>());