import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../users.interface';

export const UsersActions = createActionGroup({
  source: '[Users]',
  events: {
    set: props<{ users: IUser[] }>(),
    edit: props<{ user: IUser }>(),
    delete: props<{ id: number }>(),
    create: props<{ user: IUser }>(),
  },
});
