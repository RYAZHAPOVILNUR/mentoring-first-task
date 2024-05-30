import { createFeature, createReducer, on } from "@ngrx/store";
import { IUser } from "@models/user.model";
import * as UsersActions from './users.action';

export interface UsersState {
  users: IUser[],
  loading: boolean,
  error: string | null,
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const USERS_FEATURE_KEY = 'users';

export const usersFeature = createFeature({
  name: USERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(UsersActions.loadUsers, (state) => ({
      ...state,
      loading: true,
    })),

    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
      ...state,
      users: users,
      loading: false,
    })),

    on(UsersActions.deleteUser, (state, { userToDelete }) => ({
      ...state,
      loading: true,
    })),

    on(UsersActions.deleteUserSuccess, (state, { userToDelete }) => ({
      ...state,
      users: state.users.filter((user) => user.id !== userToDelete.id),
      loading: false,
    })),

    on(UsersActions.deleteUserFailuer, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })),

    on(UsersActions.createUser, (state, { userData }) => ({
      ...state,
      loading: true,
    })),

    on(UsersActions.createUserSuccess, (state, { userData }) => {
      return {
        ...state,
        users: [...state.users, userData],
        loading: false,
      }
    }),

    on(UsersActions.createUserFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })),

    on(UsersActions.editUser, (state, { userToEdit }) => ({
      ...state,
      loading: true,
    })),

    on(UsersActions.editUserSuccess, (state, { userToEdit }) => ({
      ...state,
      users: state.users.map(
        (user: IUser) => user.id === userToEdit.id ? userToEdit : user
      ),
      loading: false,
    })),

    on(UsersActions.editUserFailure, (state, { error }) => ({
      ...state,
      error: error,
      loading: false,
    })),
  )
});
