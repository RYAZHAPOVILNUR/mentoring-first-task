import { createFeature, createReducer, on } from '@ngrx/store';
import { UserEntity } from '../entities/UserEntity';
import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users'

export interface UsersState {
  users: UserEntity[];
  error: Error | null;
  status: 'init' | 'loading' | 'loaded' | 'error',
}

export const initialState: UsersState = {
  users: [],
  error: null,
  status: 'init',
};

export const usersFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UsersActions.loadUsers, (state) => {
      return {...state, status: 'loading' as const}
    }),
    on(UsersActions.loadUsersSuccess, (state, {users}) => {
      return {...state, users, status: 'loaded' as const}
    }),
    on(UsersActions.loadUsersFailed, (state, {error}) => {
      return {...state, error, status: 'error' as const};
    }),
    on(UsersActions.addUser, (state, {userData}) => {
      const newUser = {...userData, id: new Date().getTime()}
      return {...state, users: [...state.users, newUser]};
    }),
    on(UsersActions.editUser, (state, {userData}) => {
      const editedUsers = state.users.map(user => user.id === userData.id ? userData : user)
      return {...state, users: editedUsers};
    }),
    on(UsersActions.deleteUser, (state, {id}) => {
      return {...state, users: state.users.filter((user) => user.id !== id)};
    }),
  )
})
