import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users.reducer';

export const selectUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users,
);
