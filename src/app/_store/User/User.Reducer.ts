import { createReducer, on } from '@ngrx/store';
import { usersState } from './User.State';
import { editedUser, loadUsers, loadUsersFailure, loadUsersSuccess } from './User.Action';

const _usersReducer = createReducer(
    usersState,
    on(loadUsers, state => ({
        ...state,
        loading: true,
    })),
    on(loadUsersSuccess, (state, action) => ({
        ...state,
        loading: false,
        usersList: action.usersList,
    })),
    on(loadUsersFailure, (state, action) => ({
        ...state,
        loading: false,
        errormessage: action.errormessage,
    })),
    on(editedUser, (state, action) => ({
        ...state,
        loading: false,
        usersList: state.usersList.map(user =>
            user.id === action.editedUser.id ? { ...user, ...action.editedUser } : user
        ),
    }))
);

export function UsersReducer(state: any, action: any) {
    return _usersReducer(state, action);
}
