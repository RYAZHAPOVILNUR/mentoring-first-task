import {createAction, props} from "@ngrx/store";
import {User} from "../../users.interface";


export const saveUserAction = createAction('[Save] user', props<User>());
