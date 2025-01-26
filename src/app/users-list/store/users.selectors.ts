import { User } from '../../interfaces/user.interface';
import { createSelector } from '@ngrx/store';

interface UserState {
  users: User[];
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UserState) => state.users,
);
