import {Routes} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
    title: 'Users'
  },
  {path: '', redirectTo: '/users', pathMatch: 'full'}, // redirect to `users-list`
];
