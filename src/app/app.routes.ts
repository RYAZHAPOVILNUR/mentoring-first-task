import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { MainWebComponent } from './main-web/main-web.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'main',
    component: MainWebComponent,
  },

  {
    path: 'todo',
    component: TodoListComponent,
  },
];
