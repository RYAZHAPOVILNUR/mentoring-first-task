import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USERS_FEATURE_KEY, UsersState} from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsersStatus = createSelector(selectUsersState, (state: UsersState) => state.status);

export const selectUsersError = createSelector(selectUsersState, (state: UsersState) => state.error);

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.users);
