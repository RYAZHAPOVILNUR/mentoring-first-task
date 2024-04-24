import { createReducer, on, State, Action } from "@ngrx/store";
import {
    createUser,
    createUserSuccess,
    deleteUser,
    deleteUserSuccess,
    editUser,
    editUserSuccess,
    getUsers,
    getUsersSuccess
} from "./users.actions";
import { User } from "../../modules/interfaces/user.interface";

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
    users: User[],
}

export const initialUsersState: UsersState = {
    users: []
}

export const usersReducer = createReducer(
    initialUsersState,
    on(getUsers, state => ({ ...state })),

    on(getUsersSuccess, (state, { users }) => ({ ...state, users })),

    on(createUser, state => ({ ...state })),

    on(createUserSuccess, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),

    on(deleteUser, state => ({ ...state })),

    on(deleteUserSuccess, (state, { id }) => ({
        ...state,
        users: state.users
            .filter((filtredUser) => filtredUser.id !== id)
    })),

    on(editUser, state => ({ ...state })),

    on(editUserSuccess, (state, { user }) => ({
        ...state,
        users: state.users
            .map(
                (updatedUser) =>
                    updatedUser.id === user.id
                        ? user : updatedUser)
    }))
)