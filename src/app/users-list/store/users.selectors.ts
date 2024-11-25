import { createSelector } from '@ngrx/store';
import { IUser } from '../users.interface';

interface UserState {
  users: IUser[];
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUser = createSelector(
  selectUsersFeature,
  (state) => state.users
);
