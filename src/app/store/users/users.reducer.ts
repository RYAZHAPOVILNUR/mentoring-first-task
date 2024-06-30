import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UserState, initialUserState } from './users.state';

export const usersReducer = createReducer(
  initialUserState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  })),
  on(UserActions.addUser, (state, { newUser }) => ({
    ...state,
    users: [...state.users, newUser],
  })),
  on(UserActions.editUser, (state, { editUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === editUser.id ? editUser : user
    ),
  }))
);
