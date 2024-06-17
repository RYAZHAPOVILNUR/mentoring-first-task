import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { User } from '../model/user';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
  users: User[]; // which Users record has been selected
  loading: boolean;
  error: string | null;
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
    loading: false,
    error: null,
  })),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UsersActions.addUserSuccess, (state, { userData }) => {
    const id = returnNewId(state.users);
    return {
      ...state,
      users: [...state.users, { ...userData, id }],
    };
  }),
  on(UsersActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(UsersActions.editUserSuccess, (state, { userData }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === userData.id ? userData : user,
    ),
  })),
);

function returnNewId(users: User[]): number {
  return (
    1 +
    users.reduce((max, user) => (user.id > max ? user.id : max), users[0].id)
  );
}
