import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "@app/models/user-state.interface";

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectLoadUsers = createSelector(
    selectUsersState,
    (state: UserState) => state.users
);