// src/app/store/users/users.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: fromUsers.State) => state.users
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: fromUsers.State) => state.error
);
