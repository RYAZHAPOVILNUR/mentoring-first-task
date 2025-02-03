import { createReducer, on } from "@ngrx/store";
import { UserActions } from "./users.actions";
import { UserState } from "../../app.state";

const initialState: UserState = {
  users: [],
  error: null,
};

export const userReducers = createReducer(
  initialState,
  on(UserActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
    error: null,
  })),
  on(UserActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user) => {
      return user.id === payload.user.id ?
      payload.user :
      user
    }),
  })),
  on(UserActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
  on(UserActions.delete, (state, payload) => ({
    ...state,
    users: state.users.filter(user => user.id !== payload.id),
  })),
  on(UserActions.error, (state, payload) => ({
    ...state,
    error: payload.error,
  })),
);
