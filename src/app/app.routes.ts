import { Routes } from '@angular/router';
import { UsersListComponent } from './common-ui/users-list/users-list.component';
import { UserPagesComponent } from './pages/user-pages/user-pages.component';

export const routes: Routes = [
    { path: '', component: UserPagesComponent },
    { path: 'users', component: UsersListComponent },
];


