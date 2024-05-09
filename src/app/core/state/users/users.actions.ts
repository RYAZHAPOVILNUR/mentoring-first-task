import { createAction, props } from "@ngrx/store"
import { UsersType } from '../../../shared/types/users-types.type'

export const loadUsers = createAction('[Users] load users')
export const loadUserSuccess = createAction('[Users] load user success', props<{ list: UsersType[] }>())
export const loadUserFail = createAction('[Users] load user fail', props<{ errormessage: string }>())

export const addUser = createAction('[Users] add user', props<{ inputdata: UsersType }>())
export const addUserSuccess = createAction('[Users] add user success', props<{ inputdata: UsersType }>())

export const updateUser = createAction('[Users] update user', props<{ inputdata: UsersType }>())
export const updateUserSuccess = createAction('[Users] update user success', props<{ inputdata: UsersType }>())

export const deleteUser = createAction('[Users] delete user', props<{ id: number }>())
export const deleteUserSuccess = createAction('[Users] delete user success', props<{ id: number }>())

export const getUser = createAction('[Users] get user', props<{ id: number }>())
export const getUserSuccess = createAction('[Users] get user success', props<{ obj: UsersType }>())

export const showAlert = createAction('[Users] show alert', props<{ message: string, resptype: string }>())
export const emptyAction = createAction('emptyaction')


export const filteredUsers = createAction('[Users] filtered users', props<{ name: string }>())