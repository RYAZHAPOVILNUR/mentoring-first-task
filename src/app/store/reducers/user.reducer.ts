import { createReducer, on } from "@ngrx/store";
import * as UserActions from "@store/actions/user.actions";
import { UserState } from "@models/user-state.interface";

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.loadUsers, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(UserActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        users
    })),
    on(UserActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        loading: false, 
        error
    })),
    on(UserActions.addUser, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),
    on(UserActions.updateUser, (state, { user }) => ({
        ...state,
        users: state.users.map(updatedUser => 
            (updatedUser.id === user.id) ? user : updatedUser
        )
    })),
    on(UserActions.deleteUser, (state, { id }) => ({
        ...state,
        users: state.users.filter(updatedUser => updatedUser.id !== id)
    }))
);