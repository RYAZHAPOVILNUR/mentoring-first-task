import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USERS_FEATURE_KEY, UsersState} from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(selectUsersState, (state: UsersState) => state.users);
