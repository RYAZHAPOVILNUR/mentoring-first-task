import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducer";

export const featureSelector = createFeatureSelector<UsersState>('usersState');


export const selectUsers = createSelector(
    featureSelector,
    state => state.users
)