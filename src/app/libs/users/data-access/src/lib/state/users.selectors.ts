import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPostsStateInterface } from "./users.models";

export const USERS_FEATURE_KEY = 'users';

export const selectUsersState = createFeatureSelector<IPostsStateInterface>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(selectUsersState, (state: IPostsStateInterface) => state.users);

