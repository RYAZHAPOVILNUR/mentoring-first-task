import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "@app/models/user-state.interface";

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectLoadUsers = createSelector(
    selectUserState,
    (state: UserState) => state.users
);

export const selectLoadUsersSuccess = createSelector(
    selectUserState,
    (state: UserState) => state.loading
);

export const selectLoadUsersFailure = createSelector(
    selectUserState,
    (state: UserState) => state.error
);