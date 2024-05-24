import { createReducer, on } from '@ngrx/store';
import * as UserAction from '../+state/users.action'
import { User } from "../interface/users.interface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState{
    users: User[],
    loading: boolean;
    error: string;
}

export const initialState: UsersState = {
    users: [],
    loading: false,
    error: ''
}

export const userReducer = createReducer(
    initialState,
    on(UserAction.getUsers, state => ({
        ...state,
        loading: true,
        error: ''
    })),
    on(UserAction.getUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        loading: false,
        error: ''
    })),
    on(UserAction.getUsersFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(UserAction.deleteUser, (state) =>({
        ...state,
        loading: true,
        error: '' 
    })),
    on(UserAction.deleteUserSuccess, (state, { userId }) => ({
        ...state,
        loading: false,
        users: state.users.filter(user => user.id !== userId),
        error: ''
    })),
    on(UserAction.deleteUserFailure, (state, { error } ) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(UserAction.editUser, (state) => ({
        ...state,
        loading: true,
        error: ''
    })),
    on(UserAction.editUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users.map(u => (u.id === user.id ? user : u )),
        loading: false
    })),
    on(UserAction.editUserFailure, (state, { error } ) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(UserAction.createUser, (state) => ({
        ...state,
        loading: true,
        error: ''
    })),
    on(UserAction.createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user],
        error: '',
        loading: false

    })),
    on(UserAction.createUserFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
    on(UserAction.returnUsers, (state) => ({
        ...state,
        loading: true,
        error: ''
    })),
    on(UserAction.returnUsersSuccess, (state, { users }) => ({
        ...state,
        users: users,
        loading: false,
        error: ''
    })),
    on(UserAction.returnUsersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
);