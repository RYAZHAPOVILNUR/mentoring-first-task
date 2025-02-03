import { Routes } from '@angular/router';
import { UsersListsComponent } from './users-list/users-list.component';
import { ContentComponent } from './content/content.component';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentComponent
  },
  {
    path: 'users',
    component: UsersListsComponent
  },
  {
    path: 'todos',
    component: TodosComponent
  },
];
