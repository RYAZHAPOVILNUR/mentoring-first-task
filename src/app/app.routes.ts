import { Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {HeaderComponent} from "./components/header/header.component";
import {TodoListComponent} from "./components/todo-list/todo-list.component";



export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'users',
    component: HeaderComponent,
    outlet: 'Component1'
  },
  {
    path: 'todos',
    component: TodoListComponent
  }
];
