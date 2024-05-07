import {createAction, props} from '@ngrx/store'
import {User} from '../interface/users.interface'

export const loadUserAction = createAction('[Users], Load Users')
export const loadUserActionSuccess = createAction(
  '[Users], Load Users Success',
  props<{users: User[]}>(),
)
export const loadUserActionFailure = createAction(
  '[Users], Load Users Failure',
  props<{errorMessage: string}>(),
)

export const addUserAction = createAction(
  '[Users], Add User',
  props<{user: User}>(),
)
export const editUserAction = createAction(
  '[Users], Edit User',
  props<{updatedUser: User}>(),
)
export const deleteUserAction = createAction(
  '[Users], Delete User',
  props<{userId: number}>(),
)
