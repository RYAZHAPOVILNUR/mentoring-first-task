import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {UsersListComponent} from "./pages/users/users-list/users-list.component";

export const routes: Routes = [
  {path: 'users', component: UsersListComponent },
];
