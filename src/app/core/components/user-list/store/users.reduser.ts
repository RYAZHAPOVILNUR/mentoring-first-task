import { createReducer, on } from "@ngrx/store";
import { IUser } from "../../../models/user";
import { UserActions } from "./users.actions";


const initialState:{ users: IUser[], err: string | null} = {
    users: [],
    err: null
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.load, (state, payload) => ({
        ...state,
        users: payload.users,
        err: null
    })),
    on(UserActions.success, (state, payload) => ({
        ...state,
        users: payload.users,
        err: null
    })),
    on(UserActions.fail, (state, payload) => ({
        ...state,
        err: payload.error
    })),
    on(UserActions.edit, (state, payload) => ({
        ...state,
        users: state.users.map((user) => {
            if (user.id === payload.user.id){
                return payload.user;
            } else {
                return user;
            }
        }),
    })),
    on(UserActions.create, (state, payload) => ({
        ...state,
        users: [...state.users, payload.user],
    })),
    on(UserActions.delete, (state, payload) =>({
        ...state,
        users: state.users.filter((user) => user.id!== payload.id),
    }))

)