import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE_KEY, UsersState } from "./users.reducers";

export const featureSelector = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(featureSelector, state => state.users)
