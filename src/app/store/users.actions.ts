import { createActionGroup, props } from '@ngrx/store';
import { User } from '../models/users.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'set': props<{ users: User[] }>(),
    'edit': props<{ editedUser: User }>(),
    'create': props<{ user: User }>(),
    'delete': props<{ userId: number }>(),
  },
});
