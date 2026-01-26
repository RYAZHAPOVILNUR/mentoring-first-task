import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState } from './users-list.reducer';

export const selectUsersState =
  createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

