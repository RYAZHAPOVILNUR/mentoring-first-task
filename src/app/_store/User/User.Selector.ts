import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState, User } from '../../../_model/users';

// Селектор для всего состояния приложения
export const selectAppState: MemoizedSelector<object, AppState> =
    createFeatureSelector<AppState>('app');

export const selectUsersState = createSelector(selectAppState, (state: AppState) => state.users);

export const selectAllUsers = createSelector(selectUsersState, (users: User[]) => users);

export const selectLastUserId = createSelector(selectUsersState, (users: User[]) => users.at(-1));
