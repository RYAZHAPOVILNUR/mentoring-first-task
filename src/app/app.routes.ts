import {Routes} from '@angular/router';
import {UsersListComponent} from "./Components/users-list/users-list.component";
import {HomepageComponent} from "./Components/homepage/homepage.component";
import {AdminComponent} from "./Components/admin/admin.component";
import {authGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  }
];
