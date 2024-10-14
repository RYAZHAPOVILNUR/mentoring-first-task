import { createReducer, on, Action } from "@ngrx/store";
import User from "../interface/interface";
import { addUser, deleteUser, editUser, loadUser, loadUserFailed, loadUserSuccess } from "./user.action";


export const USER_KEY = 'user'

export interface UserState {
    users: User[],
    status: 'init' | 'loading' | 'success' | 'error',
    error: unknown, 
};

export const initialState: UserState = {
    users: [],
    status: 'init',
    error: null,
};

export const userReducer = createReducer (
    initialState,

    on(loadUser,(state) => ({
        ...state,
        status: 'loading' as const,
    })),

    on(loadUserSuccess,(state, { users }) => ({
        ...state,
        status: 'success' as const,
        users,
    })),

    on(loadUserFailed,(state, { error }) => ({
        ...state,
        status: 'error' as const,
        error,
    })),

    on(deleteUser, (state, { id }) => ({
        ...state,
        users: state.users.filter(u => id !== u.id) 
    })),
    
    on(addUser, (state, { user }) => ({
        ...state,
        users: [ ...state.users, user ]
    })),

    on(editUser, (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u)
    }))
);


export function usersReducer(state: UserState, action: Action){
    return userReducer(state, action);
}