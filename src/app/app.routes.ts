import { Routes } from '@angular/router';
import { UserListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  }
];
