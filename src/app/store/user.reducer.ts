import { createReducer, on } from "@ngrx/store";
import * as userActions from './user.action'
import { User } from "../interface/users.interface";

export interface UserState{
    isLoading: boolean,
    users: User[],
    error: string | null
    }

export const inilialState: UserState={
 isLoading: false,
 users:[],
 error: null
}

export const USER_FEATER_KEY='user'

export const RouterReducer = createReducer(inilialState, 
    on(userActions.actionLoading, (state)=>({
        ...state,
        isLoading: true,
    })),
    on(userActions.actionGetUser, (state, action)=>({
        ...state,
        isLoading: false,
        users: action.users
    })),
    on(userActions.actionError, (state, action)=>({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(userActions.actionAddUser, (state, {user})=>({
        ...state,
        isLoading: true,
        users: [...state.users, user],
    })),
    on(userActions.deleteUser, (state,{id})=>({
        ...state,
        users: state.users.filter((n)=>n.id!==id)
    })),
    on(userActions.actionUpdate, (state, {user})=>({
        ...state,
       user: state.users.map((existingUser) => {
        if (existingUser.id === user.id) {
          return user;
        } else {
          return existingUser;
        }
    })})
),
)