import { Routes } from '@angular/router';
import {UsersListComponent} from "./pages/users/users-list/users-list.component";
import {HeaderComponent} from "./pages/header/header.component";

export const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: 'users', component: UsersListComponent
      }
    ]
  },
];
