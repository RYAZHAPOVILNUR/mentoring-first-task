import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as UserActions from '../NGRX/actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const USER_KEY = 'user';
export const userReducer = createReducer(
  initialState,
  on(UserActions.addUser, (state, { user }) => {
    return {
      ...state,
      users: [...state.users, user],
    };
  }),
  on(UserActions.deleteUser, (state, { userId }) => {
    return {
      ...state,
      users: state.users.filter((user) => user.id !== userId),
    };
  }),
  on(UserActions.editUser, (state, { editedUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    ),
  })),
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUserSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
