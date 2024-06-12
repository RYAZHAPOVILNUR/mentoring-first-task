import { createAction, props } from "@ngrx/store";
import { User } from "../interface/users.interface";
import * as actionEmun from './action.Enum'


export const actionLoading = createAction(actionEmun.ActionEnums.USER_LOADING)
export const actionGetUser = createAction(actionEmun.ActionEnums.GET_USER, props<{users: User[]}>())
export const actionError = createAction(actionEmun.ActionEnums.USER_ERROR, props<{error: any}>())
export const actionAddUser = createAction(actionEmun.ActionEnums.ADD_USER, props<{user: User}>())
export const deleteUser = createAction(actionEmun.ActionEnums.DELETE_USER, props<{id: number}>())
export const actionUpdate = createAction(actionEmun.ActionEnums.UPDATE_USER, props<{user: User}>())