import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  { path: 'users', component: UsersListComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }, // Default route (optional)
  { path: '**', redirectTo: '/users', pathMatch: 'full' } // Wildcard route (optional)
];
