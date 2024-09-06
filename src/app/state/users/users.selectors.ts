import { createSelector } from '@ngrx/store'
import { usersFeature } from './users.reducers'

export const selectUsers = createSelector(
  usersFeature.selectUsersState,
  (state) => state.users,
)
