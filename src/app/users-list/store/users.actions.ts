import { createActionGroup, props } from "@ngrx/store";
import { User } from "../../models/user.interface";

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'set': props<{users: User[]}>(),
    'edit': props<{user: User}>(),
    'create': props<{user: User}>(),
    'delete': props<{id: number}>(),
    'error': props<{error: string}>(),
  }
})