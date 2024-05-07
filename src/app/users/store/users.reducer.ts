import {createReducer, on} from '@ngrx/store'
import {
  addUserAction,
  deleteUserAction,
  editUserAction,
  loadUserActionSuccess,
} from './users.action'
import {AppState} from '../../app.state'

export const initialUserState: AppState = {
  users: [],
}

export const usersReducer = createReducer(
  initialUserState,
  on(loadUserActionSuccess, (state, {users}) => ({...state, users})),

  on(addUserAction, (state, {user}) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(editUserAction, (state, {updatedUser}) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user,
    ),
  })),
  on(deleteUserAction, (state, {userId}) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId),
  })),
)
