import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../../_model/users';

const selectUserState = createFeatureSelector<UserModel>('users');

export const selectAllUsers = createSelector(
    selectUserState,
    (state: UserModel) => state.usersList
);

export const selectUsersLoading = createSelector(
    selectUserState,
    (state: UserModel) => state.loading
);

export const selectUsersError = createSelector(
    selectUserState,
    (state: UserModel) => state.loading
);
export const selectFilteredUsersId = (userId: number) =>
    createSelector(selectAllUsers, users => users?.filter(user => user.id !== userId));
