import { createReducer, on, Action } from "@ngrx/store";
import { User } from "../interfaces/user.interface";
import * as UsersActions from '../users/users.actions' // импортировали все actions из users.reduces.ts ии присвоили ему UsersActions

export interface UsersState { // создали интерфейс, который описывает, что будет лежать в initialState
    users: User [];  // users будет массив с интерфейсом Users
    loading: boolean; // булевое значение
    error: string | null // ошибка может быть или строкой или null
}

export const initialState: UsersState = { // это изначальное значение
    users: [],  // присвоили пустой массив
    loading: false, // присвоили false
    error: null // присвоили null
}

export const USERS_FEATURE_KEY = 'users';
export const usersReducer = createReducer(  //вызываем функцию
    initialState,    // первый аргумент
    on(UsersActions.getUsersList, (state) => ({...state, loading: true, error: null})),  // след. аргументы функция on которые перезаписывают state
    on(UsersActions.getUsersListSuccess, (state, { users }) => ({...state, users: [...users], loading: false, error: null})),
    on(UsersActions.getUsersListFailure, (state, { error }) => ({...state, loading: false, error: error})),

    on(UsersActions.getUser, (state, { id }) => ({...state, users: state.users.filter(user => user.id ==id)})),

    on(UsersActions.deleteUser, (state, { id }) => ({...state, users: state.users.filter(user => user.id !==id)})),


    on(UsersActions.editUser, (state, { user }) => ({...state, users: state.users.map(u => u.id === user.id ? { ...u, ...user } : u)})),
    on(UsersActions.editUserSuccess, (state, { user }) => ({...state, users: state.users.map(u => u.id === user.id ? { ...u, ...user } : u), loading: false, error: null})),
    on(UsersActions.editUserFailure, (state, { error }) => ({...state, loading: false, error: error})),

    on(UsersActions.addUser, (state, { user }) => ({...state, users: [...state.users, user]})),

)