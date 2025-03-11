import { createReducer, on } from '@ngrx/store';
import { UsersActions } from './user.actions';
import { User } from '../user-list.component';

const initialState: { users: User[] } = {
  users: [],
};

export const UserReducer = createReducer(
  initialState,
  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),

  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) => {
      if (user.id === payload.user.id) {
        return payload.user;
      } else {
        return user;
      }
    }),
  })),

  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),

  on(UsersActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
  }))
);
