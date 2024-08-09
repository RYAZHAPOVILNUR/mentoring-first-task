import {USERS_FEATURE_KEY, UsersState} from "./users.reducer";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectFeature = createFeatureSelector<UsersState>(
  USERS_FEATURE_KEY,
);

export const selectUsers = createSelector(
  selectFeature,
  state => state.users,
)
