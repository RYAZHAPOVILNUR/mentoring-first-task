import { createReducer, on } from '@ngrx/store';
import { UserActions } from './users.actions';
import { User } from '../models/users.model';

const initialState: { users: User[] } = {
  users: [],
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.set, (state, {users}) => ({
    ...state,
    users: users,
  })),
  on(UserActions.edit, (state, {editedUser}) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    ),
  })),
  on(UserActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UserActions.delete, (state, {userId}) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  }))
);
