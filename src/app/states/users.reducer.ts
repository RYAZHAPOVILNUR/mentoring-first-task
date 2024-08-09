import {createReducer, on} from "@ngrx/store";
import * as userActions from "./users.actions"
import {User} from "../types/user.types";

export interface UsersState {
  users: User[],
  loading: boolean,
  error: string | null,
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}
export const USERS_FEATURE_KEY = 'users';

export const usersReducer = createReducer(
  initialState,
  on(userActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(userActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    users: [...users],
    loading: false,
    error: null,
  })),

  on(userActions.loadUsersFail, (state, {error}) => ({
    ...state,
    loading: true,
    error: error,
  })),

  on(userActions.addUser, (state, {user}) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(userActions.deleteUser, (state, {id}) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
  })),

  on(userActions.updateUser, (state, {updatedUser}) => ({
    ...state,
    users: state.users.map(user => user.id === updatedUser.id ? updatedUser : user)
  })),
)
