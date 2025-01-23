import { User } from '../../types/user.types'
import { createReducer, on } from '@ngrx/store'
import * as UserActions from './users.actions'

export const initialState: {
  users: User[]
  loading: boolean
  error: string | null
} = {
  users: [],
  loading: false,
  error: null,
}

export const USERS_KEY = 'users'

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state, payload) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, payload) => ({
    ...state,
    users: payload.users,
    loading: false,
    error: null,
  })),
  on(UserActions.loadUsersFailed, (state, payload) => ({
    ...state,
    loading: false,
    error: payload.error,
  })),
  on(UserActions.addUser, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
    loading: false,
    error: null,
  })),
  on(UserActions.deleteUser, (state, payload) => ({
    ...state,
    users: state.users.filter((user) => user.id !== payload.id),
    loading: false,
    error: null,
  })),
  on(UserActions.updateUser, (state, payload) => ({
    ...state,
    users: state.users.map((user) => (user.id === payload.user.id ? payload.user : user)),
    loading: false,
    error: null,
  }))
)
