import { Routes } from '@angular/router';
import { UserListComponent } from './common-ui/components/user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
  },
];
