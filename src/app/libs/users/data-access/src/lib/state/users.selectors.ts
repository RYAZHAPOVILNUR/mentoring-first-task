import { adapter } from './users.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IUsersStateInterface } from "./users.models";

export const USERS_FEATURE_KEY = 'users';

export const selectUsersState = createFeatureSelector<IUsersStateInterface>(USERS_FEATURE_KEY);

export const selectAllUsers = createSelector(selectUsersState, adapter.getSelectors().selectAll);
