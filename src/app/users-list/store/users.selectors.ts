import { createSelector } from "@ngrx/store";
import { UserState, AppState } from "../../app.state";

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users,
);

export const selectError = createSelector(
  selectUsersFeature,
  (state: UserState) => state.error,
);