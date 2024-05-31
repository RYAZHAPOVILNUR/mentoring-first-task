import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
