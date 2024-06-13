import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '../../../_model/users';
import {
    createUserSuccess,
    editedUserSuccess,
    loadUsers,
    loadUsersFailure,
    loadUsersSuccess,
    removeUserSuccess,
} from './User.Action';

export const initialState: AppState = {
    users: [],
    loading: false,
    errormessage: '',
    // Инициализируйте другие состояния здесь
};

const _appReducer = createReducer(
    initialState,

    on(loadUsers, state => ({
        ...state,
        loading: true,
    })),
    on(loadUsersSuccess, (state, { users }) => ({
        ...state,
        loading: false,
        users: users,
    })),
    on(loadUsersFailure, (state, { errormessage }) => ({
        ...state,
        loading: false,
        errormessage: errormessage,
    })),
    on(editedUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        users: state.users.map(item => (item.id === user.id ? { ...item, ...user } : item)),
    })),
    on(removeUserSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        users: state.users.filter(item => item.id !== id),
    })),
    on(createUserSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        users: [...state.users, { ...user, id: state.users.at(-1)!.id + 1 }],
    }))
    // Добавьте другие обработчики действий здесь
);

export function appReducer(state: AppState | undefined, action: Action) {
    return _appReducer(state, action);
}
