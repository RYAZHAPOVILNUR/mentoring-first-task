import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path:'users',
        component: UsersListComponent,
    },
    {
        path:'**',
        component: NotFoundComponent
    }
];
