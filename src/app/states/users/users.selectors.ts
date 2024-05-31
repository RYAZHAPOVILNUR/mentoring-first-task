
import {UsersState} from "./users.state";
import { createFeatureSelector, createSelector} from "@ngrx/store";
import {USERS_FEATURE_KEY} from "./users.reducer";

export const selectFeature =createFeatureSelector<UsersState>(
  USERS_FEATURE_KEY
)

export const selectUsers = createSelector(
  selectFeature,
  state=> state.users
)


