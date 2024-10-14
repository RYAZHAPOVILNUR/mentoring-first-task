import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_KEY, UserState } from "./user.reducer";

export const selectUserState = createFeatureSelector<UserState>(USER_KEY);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectStatus = createSelector(
  selectUserState,
  (state: UserState) => state.status
);
