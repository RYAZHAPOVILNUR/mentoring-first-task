import { ActionReducerMap } from '@ngrx/store';
import { UserState } from './users/users.state';
import { usersReducer } from './users/users.reducer';

export interface AppState {
  users: UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  users: usersReducer,
};
