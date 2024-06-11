import { createAction, props } from "@ngrx/store";
import { User } from "../interfaces/user";

export const getUsers = createAction('[USERS] get users');

export const loadUsers = createAction(
    '[USERS] load users',
    props<{ users: User[] }>()
);

export const deleteUser = createAction(
    '[USERS] delete user',
    props<{ id: number }>()
);

export const addUser = createAction(
    '[Users] add user',
    props<{ userData: User }>()
);

export const editUser = createAction(
    '[Users] edit user',
    props<{ userData: User }>()
);
