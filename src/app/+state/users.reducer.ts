import {Action, createReducer, on} from '@ngrx/store';

import * as UsersActions from './users.actions';
import {User} from "../types/user.model";
import {LoadingStatus} from "../types/loading-status.type";

export const USERS_FEATURE_KEY = 'users';

export type UsersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface UsersState {
  users: User[];
  status: LoadingStatus;
  error: UsersErrors | null;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
  // set initial required properties
  users: [],
  status: 'init',
  error: null,
};

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) => ({
    ...state, users: [...users], status: 'loaded' as const
  })),
  on(UsersActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(UsersActions.deleteUserSuccess, (state, {id}) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
  })),
  on(UsersActions.addUserSuccess, (state, {userData}) => {
    function getNextId() {
      return 1 + state.users
        .reduce((maxId, user) => Math.max(maxId, user.id), -1);
    }

    const id = getNextId();
    console.log({id})
    const username = `${userData.name}${id}`;
    return ({
      ...state,
      users: [{...userData, id, username}, ...state.users]
    })
  }),
  on(UsersActions.editUserSuccess, (state, {userData}) => {
    console.log(state, userData)
    return ({
        ...state,
        users: state.users.map(user => (user.id === userData.id) ? userData : user),
      }
    )
  }),
  on(UsersActions.editUserFailed, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
