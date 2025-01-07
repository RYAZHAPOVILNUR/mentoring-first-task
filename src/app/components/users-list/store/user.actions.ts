import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../../interfaces/User.interface';

export const UsersActions = createActionGroup({
  source: 'users',
  events: {
    set: props<{ users: User[] }>(),
    edit: props<{ user: User }>(),
    create: props<{ user: User }>(),
    delete: props<{ id: number }>(),
  },
});
