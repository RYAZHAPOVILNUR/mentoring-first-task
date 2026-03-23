import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../interfaces/users.interface';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ users: User[] }>(),
    loadFailure: props<{ error: string }>(),
    set: props<{ users: User[] }>(),
    edit: props<{ user: User }>(),
    create: props<{ user: User }>(),
    delete: props<{ id: number }>(),
  },
});
