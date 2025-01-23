import { createAction, emptyProps, props } from '@ngrx/store'
import { User } from '../../types/user.types'

export const loadUsers = createAction('[User] Load users]', emptyProps)

export const loadUsersSuccess = createAction(
  '[User] Load users success',
  props<{ users: User[] }>()
)

export const loadUsersFailed = createAction('[User] Load users failed', props<{ error: string }>())

export const addUser = createAction('[User] Add user', props<{ user: User }>())

export const updateUser = createAction('[User] Update user', props<{ user: User }>())

export const deleteUser = createAction('[User] Delete user', props<{ id: number }>())
