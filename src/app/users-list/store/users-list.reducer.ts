import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { UsersActions } from './users-list.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: unknown | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,

  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users : users,
    loading: false,
  })),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UsersActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
  })),

  on(UsersActions.editUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
  })),  

);
