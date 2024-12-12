import {IUser} from "../interface/user";
import {createReducer, on} from "@ngrx/store";
import {UsersAction} from "./user.action";

export const USERS_FEATURE_KEY = 'users'

export type UsersError = {
  status: number,
  [key: string]: unknown
}

export interface UsersState {
  users: IUser[],
  status: string,
  error: UsersError | null
}

const initialState: UsersState = {
  users: [],
  status: '',
  error: null
}

export const userReducer = createReducer(
  initialState,
  on(UsersAction.loadUsers, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(UsersAction.loadUsersSuccess, (state, { users }) => ({
    ...state, users, status: 'loaded' as const
  })),
  on(UsersAction.loadUsersFailure, (state, { error }) => ({
    ...state, status: 'error' as const, error
  })),

  on(UsersAction.createUser, (state) => ({
    ...state, status: 'loading' as const
  })),
  on(UsersAction.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user]
  })),
  on(UsersAction.createUserFailure, (state) => ({
    ...state, status: 'error' as const
  })),

  on(UsersAction.deleteUser, (state) => ({
    ...state, status: 'loading' as const
  })),
  on(UsersAction.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  })),
  on(UsersAction.deleteUserFailure, (state) => ({
    ...state, status: 'error' as const
  })),

  on(UsersAction.editUser, (state) => ({
    ...state, status: 'loading' as const
  })),
  on(UsersAction.editUser, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map( user =>
      user.id === updatedUser.id ? updatedUser : user
    )
  })),
  on(UsersAction.editUserFailure, (state) => ({
    ...state, status: 'error' as const
  }))
)


