import { createFeatureSelector, createSelector } from '@ngrx/store';
import { usersFeatureKey, UsersState } from './users.reducer';

export const getUsersState = createFeatureSelector<UsersState>(usersFeatureKey);
export const selectUsers = createSelector(
  getUsersState,
  (state) => state.users
);
