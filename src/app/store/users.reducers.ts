import { createFeature, createReducer, on } from '@ngrx/store';
import { UserStateType } from '../../types/user-state.type';
import { UsersActions } from './users.actions';

export const usersListFeautureKey = 'usersFeauture';

export const initialState: UserStateType = {
  isLoading: false,
  users: [],
  errors: null,
};

export const usersReducer = createReducer(
  initialState,
  //load users
  on(UsersActions.getUsers, (state) => ({ ...state, isLoading: true })),
  on(UsersActions.getUsersSuccess, (state, action) => ({...state, isLoading: false, users: action.users})),
  on(UsersActions.getUsersFailure, (state, action) => ({...state, errors: action.error})),

  //adding new user
  on(UsersActions.addUser, (state) => ({ ...state, isLoading: true })),
  on(UsersActions.addUserSuccess, (state, action) => ({...state, isLoading: false, users: [...state.users, action.user]})),
  on(UsersActions.addUserFailure, (state, action) => ({...state, isLoading: false, errors: action.error})),

  //delete user
  on(UsersActions.deleteUser, (state) => ({...state, isLoading: true})),
  on(UsersActions.deleteUserSuccess, (state, action) => ({...state, isLoading: false, users: state.users.filter(user => user.id !== action.id)})),
  on(UsersActions.deleteUserFailure, (state, action) => ({...state, isLoading: false, errors: action.error})),

  //edit user
  on(UsersActions.editUser, (state) => ({...state, isLoading: true})),
  on(UsersActions.editUserSuccess, (state, action) => ({...state, isLoading: false, users: state.users.map(user => user.id === action.userChanges.id ? action.userChanges : user)})),
  on(UsersActions.editUserFailure, (state, action) => ({...state, isLoading: false, errors: action.error}))
);

export const usersFeauture = createFeature({
  name: 'usersFeauture',
  reducer: usersReducer
})