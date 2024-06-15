import { createReducer, on } from "@ngrx/store"

//actions
import * as UsersActions from "./actions";
import { IUser } from "../user";

export interface IUsersState {
    isLoading: boolean,
    users: IUser[],
    error: null | string,
}

//initial global state
export const initialState: IUsersState = {
    isLoading: false,
    users: [],
    error: null,
}


//reducers
export const reducers = createReducer(
    initialState,
    on(UsersActions.getUsers, (state) => ({...state, isLoading: true})),
    on(UsersActions.getUsersSuccess, (state, action) => ({...state, isLoading: false, users: action.users})),
    on(UsersActions.getUsersFailure, (state, action) => ({...state, isLoading: false, error: action.error})),
    // on(UsersActions.addUser, (state, action) => ({...state, isLoading: false, users: [...state.users, action.user]}))

);