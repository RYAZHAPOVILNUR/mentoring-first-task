import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IUser } from "../../../models/user";


export const UserActions = createActionGroup({
    source: 'Users',
    events: {
        'load': props<{users: IUser[]}>(),
        'success': props<{ users: IUser[] }>(),
        'fail': props<{ error: string }>(),
        'edit': props<{ user: IUser}>(),
        'create': props<{user: IUser}>(),
        'delete': props<{ id: number}>(),
    },
});