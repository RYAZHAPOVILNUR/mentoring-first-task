import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState, usersReducer } from "./users.reduces";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectGetUsersList = createSelector(
    selectUsersState,
    (state: UsersState) => state.users
)