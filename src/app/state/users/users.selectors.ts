import { createSelector } from '@ngrx/store'
import { User } from '../../types/user.types'

interface UsersState {
  users: User[]
}

interface AppState {
  users: UsersState
}

export const selectUsersFeature = (state: AppState) => state.users

export const selectedUsers = createSelector(selectUsersFeature, (state) => state.users)
