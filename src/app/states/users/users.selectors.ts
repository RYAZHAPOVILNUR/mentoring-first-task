import {User} from "../../users.interface";
import {UsersState} from "./users.state";
import {createFeature, createFeatureSelector, createSelector} from "@ngrx/store";
import {USERS_FEATURE_KEY, usersReducer} from "./users.reducer";

export const selectFeature =createFeatureSelector<UsersState>(
  USERS_FEATURE_KEY
)

export const selectUsers = createSelector(
  selectFeature,
  state=> state.users
)


