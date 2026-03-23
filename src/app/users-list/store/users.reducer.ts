import { createReducer, on } from '@ngrx/store';
import { User } from '../../interfaces/users.interface';
import { UsersActions } from './user.actions';
import { UserState } from './users.selectors';

const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(UsersActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user: User) =>
      user.id === payload.user.id ? payload.user : user,
    ),
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user: User) => user.id !== payload.id),
  })),
);
