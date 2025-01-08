import {
    createActionGroup,
    emptyProps, props
} from "@ngrx/store";
import {
    IUser,
    IUserCreate
} from "../Interfaces/IUser";

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': emptyProps,
        'loadSuccess': props<{ users: IUser[] }>(),
        'loadError': props<{ error: { message: string } }>(),
        'edit': props<{ user: IUser }>(),
        'create': props<{ user: IUserCreate }>(),
        'delete': props<{ id: number }>(),
    },
})
