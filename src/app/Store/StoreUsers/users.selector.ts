import {User} from "../../models/user";
import {createSelector} from "@ngrx/store";

export interface AppState {
  users: UserState
}

export interface UserState {
  users: User[]
}

export const selectFeatuteUsers = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectFeatuteUsers,
  (state) => state.users
)


