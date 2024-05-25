import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
    { path: '', component: AppComponent, pathMatch: "full" },
    { path: 'users', component: UsersListComponent }
];
