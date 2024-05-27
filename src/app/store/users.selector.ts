import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USERS_FEATURE, UsersState } from "./users.reducer";

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE);

export const selectUsers = createSelector(
    selectUsersState,
    (state: UsersState) => {
        console.log(state)
        return state.users
    } 
)