import { createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.actions';
import { UsersStateInterface } from "./types/users-state.interface";

export const initialState: UsersStateInterface = {
  status: 'init',
  users: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Loading Users
  on(UsersActions.getUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    status: 'loaded' as const,
    users,
  })),

  on(UsersActions.getUsersFailure, (state, { error }) => ({
    ...state,
    status: "error" as const,
    error,
  })),

  // Delete User
  on(UsersActions.deleteUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    status: 'loaded' as const,
    users: state.users.filter(v => v.id !== id),
  })),

  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  // Add User
  on(UsersActions.addUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.addUserSuccess, (state, { user }) => ({
    ...state,
    status: 'loaded' as const,
    users: [...state.users,{ ...user}],
  })),

  on(UsersActions.addUserFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  // Edit User
  on(UsersActions.editUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.editUserSuccess, (state, { user }) => ({
    ...state,
    status: 'loaded' as const,
    users: state.users.map((u) => u.id === user.id ? user : u),
  })),

  on(UsersActions.editUserFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  // Set Users
  on(UsersActions.setUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.setUsersSuccess, (state, { users }) => ({
    ...state,
    status: 'loaded' as const,
    users,
  })),

  on(UsersActions.setUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

);
