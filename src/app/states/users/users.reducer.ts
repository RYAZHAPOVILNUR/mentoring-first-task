import { createReducer, on, Action } from '@ngrx/store';
import { User } from "../../users.interface";
import * as UsersActions from './users.actions';
import {loadStoredData,} from "./users.actions";

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const USERS_FEATURE_KEY = 'users';

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...users],
    loading: false,
    error: null
  })),

  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(UsersActions.loadStoredData, (state)=>({
    ...state,
    loading: true,
    error: null,
  })),

  // on(UsersActions.loadStoredDataSuccess, (state, {data})=>({
  //     ...state,
  //     data: [...data],
  //     loading: false,
  //     error: null
  // })),


  on(UsersActions.addUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(UsersActions.addUserSuccess, (state, { userData }) => ({
    ...state,
    users: [...state.users, userData],
    loading: false,
    error: null
  })),

  on(UsersActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),

  on(UsersActions.updateUser, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    )
  }))
);

