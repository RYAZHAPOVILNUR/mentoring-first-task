import {  createSelector } from "@ngrx/store";
import { IUser } from "../../../models/user";


interface UserState {
    users: IUser[];
}

interface AppState{
    users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState) => state.users
);