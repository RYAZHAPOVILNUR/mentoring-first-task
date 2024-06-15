import { createReducer, on } from "@ngrx/store"

import * as UsersActions from "./actions";
import { IUser } from "../user";

export interface IUsersState {
    isLoading: boolean,
    users: IUser[],
    error: null | string,
}

export const initialState: IUsersState = {
    isLoading: false,
    users: [],
    error: null,
}

export const reducers = createReducer(
    initialState,
    on(UsersActions.getUsers, (state) => ({...state, isLoading: true})),
    on(UsersActions.getUsersSuccess, (state, action) => ({...state, isLoading: false, users: action.users})),
    on(UsersActions.getUsersFailure, (state, action) => ({...state, isLoading: false, error: action.error})),
    on(UsersActions.addUser, (state, action) => ({...state, isLoading: false, users: [...state.users, action.user]})),
    on(UsersActions.removeUser, (state, action) => ({...state, isLoading: false, users: state.users.filter(user => user.id !== action.id)})),
    on(UsersActions.editUser, (state, action) => ({...state, isLoading: false, users: state.users.map(item => (item.id === action.user.id ? action.user : item))}))
);