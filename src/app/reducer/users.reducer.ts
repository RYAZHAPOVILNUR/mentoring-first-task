import { createFeature, createReducer, on } from '@ngrx/store';
import {
  createUser,
  deleteUser,
  loadUserDataSuccess,
  updateUser,
} from './users.actions';
import { User } from '../data/intefaces/user.interface';

export interface UsersState {
  users: User[];
  error: string;
}

export const initialState: UsersState = {
  users: [],
  error: '',
};

export const usersFeatureKey = 'users';
export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer: createReducer(
    initialState,
    on(loadUserDataSuccess, (state, { users }) => ({
      ...state,
      users: users,
    })),
    on(deleteUser, (state, { id }) => ({
      ...state,
      users: state.users.filter((user) => user.id !== id),
    })),
    on(createUser, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
    })),
    on(updateUser, (state, { user }) => ({
      ...state,
      users: state.users.map((existingUser) => {
        return existingUser.id === user.id ? user : existingUser;
      }),
    }))
  ),
});
