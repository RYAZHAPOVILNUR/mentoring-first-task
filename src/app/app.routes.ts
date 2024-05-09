import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';
export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'user',
    component: UserCardComponent,
  },
];
