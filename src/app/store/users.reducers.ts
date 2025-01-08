import {
    createReducer,
    on
} from "@ngrx/store";
import { UsersActions } from "./users.actions";
import {
    IUser,
    IUserCreate
} from "../Interfaces/IUser";

const initialState: { users: IUser[] } = {
    users: [],
};

export const usersReducer = createReducer(
    initialState,
    on(UsersActions.loadSuccess, (state: { users: IUser[] }, payload): { users: IUser[] } => ({
        ...state,
        users: payload.users,
    })),

    on(UsersActions.create, (state: { users: IUserCreate[] }, payload): { users: IUserCreate[] } => ({
        ...state,
        users: [...state.users, payload.user],
    })),

    on(UsersActions.edit, (state: { users: IUser[] }, payload): { users: IUser[] } => ({
        ...state,
        users: state.users.map((user: IUser): IUser => {
            return user.id === payload.user.id ? payload.user : user;
        }),
    })),

    on(UsersActions.delete, (state: { users: IUser[] }, payload): { users: IUser[] } => ({
        ...state,
        users: state.users.filter((user: IUser): boolean => user.id !== payload.id),
    }))
)
