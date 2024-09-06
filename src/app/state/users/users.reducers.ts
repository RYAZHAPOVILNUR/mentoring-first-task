import { createFeature, createReducer, on } from '@ngrx/store'
import * as UsersActions from './users.actions'
import { User } from '../../data/interfaces/users.interface'

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    {
      users: [] as User[],
      loading: false,
      error: '',
    },
    on(UsersActions.loadUsers, (state) => ({
      ...state,
      loading: true,
      error: '',
    })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false,
      error: '',
    })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({
      ...state,
      users: [],
      loading: false,
      error,
    })),
    on(UsersActions.addUserSuccess, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
      loading: false,
      error: '',
    })),
    on(UsersActions.addUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(UsersActions.updateUser, (state) => ({
      ...state,
      loading: true,
      error: '',
    })),
    on(UsersActions.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map((u) => (u.id === user.id ? user : u)),
      loading: false,
      error: '',
    })),
    on(UsersActions.updateUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(UsersActions.deleteUser, (state) => ({
      ...state,
      loading: true,
      error: '',
    })),
    on(UsersActions.deleteUserSuccess, (state, { userId }) => ({
      ...state,
      users: state.users.filter(user => user.id !== userId),
      loading: false,
      error: '',
    })),
    on(UsersActions.deleteUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
})
