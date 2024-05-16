import { UsersStateInterface } from "./types/users-state.interface";
import { AppStateInterface } from "./types/app-state.interface";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectFeature = (state: AppStateInterface) => state.users

export const isLoadingSelector = createSelector(
  selectFeature,
  (state)=> state.status
);

export const usersSelector = createSelector(
  selectFeature,
  (state)=> state.users
);

export const errorSelector = createSelector(
  selectFeature,
  (state)=> state.error
);


export const USERS_FEATURE_KEY = 'users';

export const selectUsersState = createFeatureSelector<UsersStateInterface>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(selectUsersState, (state: UsersStateInterface) => state.users);
