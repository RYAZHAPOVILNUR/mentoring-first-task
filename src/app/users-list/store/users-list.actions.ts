import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Delete User': props<{ userId: number }>(),
    
    'Edit User': props<{ user: User }>(),
    
  },
});
