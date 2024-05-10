import {Routes} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";

export const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'users', component: UsersListComponent, pathMatch: 'full'
  },
  {
    path: 'users/:id', component: UserDetailsComponent
  },
];
