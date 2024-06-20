import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "../../shared/interfaces/user-state.interface";
import { StorageKey } from "../../shared/enums/user.enum";

export const selectUsersState =
  createFeatureSelector<UsersState>(StorageKey.USERS);

// Loading Users
export const selectInitUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);
export const selectLoadUsersSuccess = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);
export const selectLoadUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);
