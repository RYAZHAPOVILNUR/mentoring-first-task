import { createReducer, on } from "@ngrx/store";
import { User } from "../../../interface/user.interface";
import { UsersActions } from "./user.actions";
import { state } from "@angular/animations";

const initialState: { users: User[] } = {
    users: [],
};

export const userReducer = createReducer(
    initialState,
    on(UsersActions.set, (state, payload) => ({
        ...state,
        users: payload.users,
    })),

    on(UsersActions.edit, (state, payload) => ({
        ...state,
        users: state.users.map((user) => {
            if(user.id === payload.user.id) {
                return payload.user;
            } else {
                return user;
            }
        }),
    })),

    on(UsersActions.create, (state, payload) => ({
        ...state,
        users: [...state.users, payload.user],
    })),

    on(UsersActions.delete, (state, payload) => ({
        ...state,
        users: state.users.filter((user) => user.id !== payload.id),
    }))
);