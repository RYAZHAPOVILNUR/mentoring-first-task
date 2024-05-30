import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserCardComponent } from './pages/user-card/user-card.component';

export const routes: Routes = [
    {
        path:"", component: UsersListComponent
    },
    {
        path:"user-card", component: UserCardComponent
    }
];
