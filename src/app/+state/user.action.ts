import { createAction, props } from "@ngrx/store";
import User from "../interface/interface";


export const loadUser = createAction (
    '[User] Load User', 
)

export const loadUserSuccess = createAction (
    '[User] Load User Success',
    props<{ users: User[] }>()
)

export const loadUserFailed = createAction (
    '[User] Load User Success',
    props<{ error: string }>()
)

export const deleteUser = createAction (
    '[User] Delete User',
    props<{ id: number }>()
);

export const deleteUserFailed = createAction (
    '[User] Delete User failed',
    props<{ error: string }>()
);

export const deleteUserSuccess = createAction (
    '[User] Delete User Success',
    props<{ id: number }>()  
);

export const addUser = createAction (
    '[User] Add User',
    props<{ user: User }>()
);

export const addUserSuccess = createAction (
    '[User] Add User Success',
    props<{ user: User }>()
);

export const addUserFailed = createAction (
    '[User] Add User Failed',
    props<{ error: string }>()
);

export const editUser = createAction (
    '[User] Edit User',
    props<{ user: User }>()
);

export const editUserSuccess = createAction (
    '[User] Edit User',
    props<{ user: User }>()
);

export const editUserFailed = createAction (
    '[User] Edit User',
    props<{ error: string }>()
);