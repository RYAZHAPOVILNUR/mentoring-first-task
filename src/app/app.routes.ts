import { Routes } from '@angular/router';
import { UsersListComponent } from "./shared-ui/users-list/users-list.component";
import { HeaderComponent } from "./shared-ui/header/header.component";
import { HomeComponent } from "./shared-ui/home/home.component";
import {TodoComponent} from "./shared-ui/todo/todo.component";

export const routes: Routes = [
  {
    path: '', component: HeaderComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'user', component: UsersListComponent },
      { path: 'todo', component: TodoComponent }
    ]
  },
  { path: '**', redirectTo: 'home' }
];
