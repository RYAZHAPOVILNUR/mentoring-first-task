import { Routes } from '@angular/router';
import { UserslistComponent } from './users-list/users-list.component';
import { HeaderComponent } from './header/header.component';
import { TodoCardComponent } from './todos-list/todo-card/todo-card.component';
import { TodosListComponent } from './todos-list/todos-list.component';





export const routes: Routes = [
    {
        path: 'users',
        component: UserslistComponent,
    },
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'todos',
        component: TodosListComponent
    }

];
