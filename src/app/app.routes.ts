import { Routes } from '@angular/router';
import { UserList } from '../app/user-list/user-list.component'

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserList },
];
