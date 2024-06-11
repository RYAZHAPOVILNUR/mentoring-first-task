import { createReducer, on } from "@ngrx/store";
import { addUser, deleteUser, editUser, loadUsers } from "./users.actions";
import { User } from "../interfaces/user";

export interface UsersState {
    users: User[],
}

export const initialState: UsersState = {
    users: [],
}

export const usersReducer = createReducer(
    initialState,

    on(loadUsers, (state, action) => ({
        ...state,
        users: action.users,
    })),













    on(deleteUser, (state, action) => ({
        ...state,
        users: state.users.filter((user: User) => user.id !== action.id),
    })),

    on(addUser, (state, action) => ({
        ...state,
        users: [...state.users, action.userData]
    })),

    on(editUser, (state, { userData }) => ({
        ...state,
        users: state.users.map(user => {
            return user.id === userData.id ? userData : user;
        })
    })),
)