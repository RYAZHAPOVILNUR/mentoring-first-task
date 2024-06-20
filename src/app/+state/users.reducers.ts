import { UsersState } from "../../shared/interfaces/user-state.interface";
import { createReducer, on } from "@ngrx/store";
import * as UsersActions from "./users.actions";

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: ''
}

export const reducerUsers = createReducer(
  initialState,

  // Loading Users
  on(UsersActions.initUsers, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UsersActions.loadUsersSuccess, (state, { users}) => ({
    ...state,
    users: users,
    loading: false,
    error: ''
  })),
  on(UsersActions.loadUsersFailed, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),

 // Delete User
  on(UsersActions.deleteUser, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UsersActions.deleteUserSuccess, (state,  { id }) => ({
    ...state,
    loading: false,
    users: state.users.filter(user => user.id !== id),
    error: ''
  })),
  on(UsersActions.deleteUserFailed, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Add User
  on(UsersActions.addUser, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UsersActions.addUserSuccess,(state, { userData }) => ({
    ...state,
    users: [...state.users.concat(userData)],
    loading: false,
    error: ''
  })),
  on(UsersActions.addUserFailed, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Edit User
  on(UsersActions.editUser, state => ({
    ...state,
    loading: true,
    error: ''
  })),
  on(UsersActions.editUserSuccess,(state, { userEdit }) => ({
    ...state,
    users: state.users.map(user => user.id === userEdit.id ? userEdit : user),
    loading: false,
    error: '',
  })),
  on(UsersActions.editUserFailed, (state, { error}) => ({
    ...state,
    loading: false,
    error: error
  })),
);
