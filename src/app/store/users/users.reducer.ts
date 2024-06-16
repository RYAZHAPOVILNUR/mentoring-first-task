// src/app/store/users/users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.action';
import { User } from '../../models/user';

export interface State {
  users: User[];
  error: any;
}

export const initialState: State = {
  users: [],
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UsersActions.addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(UsersActions.editUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  }))
);
