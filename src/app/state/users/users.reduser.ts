import { createReducer, on } from "@ngrx/store";
import * as UsersActions from "./users.action";
import { User } from "../../interfaces/users";

export interface UsersState {
    users: User[];
    status: string;
    error: string|null
};

export const initialUsersState: UsersState = {
    users: [],
    status: 'init',
    error: null
};

export const USERS_FEATURE_KEY = 'users';

export const usersReducer = createReducer(
    initialUsersState,
    on(UsersActions.loadUsers, state => ({...state, status: 'loading'})),
    on(UsersActions.loadUsersSuccess, (state, {users}) => ({...state, users: [...users], status: 'loaded'})),
    on(UsersActions.loadUsersFailure, (state, {error}) => ({...state, status: 'error', error: error})),

    on(UsersActions.createUser, (state, {user}) => ({
        ...state, 
        users: [...state.users, user], 
        status: 'created'
    })),

    on(UsersActions.editUser, (state, {user}) => ({
        ...state, 
        users: state.users.map(u => u.id === user.id ? user : u), 
        status: 'edited'}
    )),

    on(UsersActions.deleteUser, (state, {id}) => ({
        ...state, 
        users: state.users.filter(user => user.id !== id), 
        status: 'deleted'
    })),
)