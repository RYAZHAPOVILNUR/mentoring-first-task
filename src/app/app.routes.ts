import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomePageComponent } from "./components/home-page/home-page.component";

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'users-list',
    component: UsersListComponent,
  },
];
