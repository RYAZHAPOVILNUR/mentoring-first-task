import { IUser } from "../Interfaces/IUser";
import { createSelector } from "@ngrx/store";

interface UserState {
    users: IUser[];
}

interface AppState {
    users: UserState;
}

export const selectUsersFeature: (state: AppState) =>
    UserState = (state: AppState): UserState =>
        state.users;

export const selectUsers = createSelector(
    selectUsersFeature,
    (state: UserState): IUser[] => state.users,
)
