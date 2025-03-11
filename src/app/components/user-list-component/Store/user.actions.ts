import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../user-list.component';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    loadUsers: emptyProps(),
    loadUsersSuccess: props<{ users: User[] }>(),
    loadUsersFailure: props<{ error: any }>(),
    edit: props<{ user: User }>(),
    create: props<{ user: User }>(),
    delete: props<{ id: number }>(),
  },
});
