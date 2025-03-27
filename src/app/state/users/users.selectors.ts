import { createSelector, createFeatureSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reduser";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
    selectUsersState,
    (state)=>state.users
);
