import { createReducer, on } from "@ngrx/store";
import * as UsersActions from './users.actions';
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IUsersStateInterface } from "./users.models";
import { TUserEntity } from "../../../../../core/data-access/src/lib/users-data.models";

export const adapter: EntityAdapter<TUserEntity> = createEntityAdapter<TUserEntity>();

export const initialState: IUsersStateInterface = adapter.getInitialState({
  status: 'init',
  error: null,
})

export const reducer = createReducer(
  initialState,

  // Loading Users
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, status: 'loaded' as const })
  ),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    status: "error" as const,
    error,
  })),

  // Delete User
  on(UsersActions.deleteUser, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(UsersActions.deleteUserSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, status: 'loaded' as const })
  ),

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

  on(UsersActions.addUserSuccess, (state, { user }) =>
    adapter.addOne(user, { ...state, status: 'loaded' as const })
  ),

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

  on(UsersActions.editUserSuccess, (state, { user }) =>
    adapter.setOne(user, { ...state, status: 'loaded' as const })
  ),

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

  on(UsersActions.setUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, status: 'loaded' as const })
  ),

  on(UsersActions.setUsersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
);

