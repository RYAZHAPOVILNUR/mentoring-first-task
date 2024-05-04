import { createReducer, on } from '@ngrx/store';
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
  loadUserAction,
} from './users.action';
import { User } from '../interface/users.interface';

export interface UsersState {
  users: User[];
}
export const initialUserState: UsersState = {
  users: [],
};

export const usersReducer = createReducer(
  initialUserState,
  on(loadUserAction, (state, { users }) => ({ ...state, users: users })),

  on(addUserAction, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(editUserAction, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    ),
  })),
  on(deleteUserAction, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  })),
);
