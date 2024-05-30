import { createReducer, on } from "@ngrx/store";
import { IUser } from "../types/users.interfase";
import { addUser, deleteUser, editUser, loadUsers } from "./users.actions";

export interface UsersState {
    users:IUser[],
    error:Error | null,
    status:'init' | 'loading'| 'succes' | 'error'
}
export const initialUserState : UsersState = {
    users:[],
    error: null,
    status:'init'
}

export const USERS_FEATURE = 'users_feature';

export const usersReducer = createReducer(
    initialUserState,
    on(loadUsers, (state, {newUsers}) => {
        return {
            ...state, 
            users: [...newUsers],
            status : 'succes' as const
        } 
    }),
    on(deleteUser, (state, {id}) => {
        return {
            ...state,
            users: state.users.filter(user => user.id !== id)
        }
    }),
    on(addUser, (state, {newUsers}) => {
        return {
            ...state,
            users:([...state.users, newUsers])
        }
    } ),
    on(editUser, (state, {user}) => {
        return {
            ...state,
            users: state.users.map(el => el.id === user.id ? user : el) 
        }
    } )
)