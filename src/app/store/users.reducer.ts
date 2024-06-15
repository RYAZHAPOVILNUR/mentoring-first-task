import { createReducer, on } from "@ngrx/store";
import * as UserActions from "@app/store/users.actions";
import { UserState } from "@models/user-state.interface";

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const USERS_FEATURE_KEY = 'users';

export const userReducer = createReducer(
    initialState,
    
    on(UserActions.loadUsers, state => ({ ...state, loading: true, error: null })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false,  error })),
    
    on(UserActions.addUser, (state, { addedUser }) => ({
        ...state,
        users: [...state.users, addedUser]
    })),

    on(UserActions.updateUser, (state, { updatedUser }) => ({
        ...state,
        users: state.users.map(user => (user.id === updatedUser.id) ? updatedUser : user)
    })),

    on(UserActions.deleteUser, (state, { user }) => ({
        ...state,
        users: state.users.filter(deletedUser => user.id !== deletedUser.id),
    }))
);