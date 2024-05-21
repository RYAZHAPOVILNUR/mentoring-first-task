import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";
import { USERS_FEATURE_KEY } from "./users.reducer";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersState) => {
    return state.users
  }
);