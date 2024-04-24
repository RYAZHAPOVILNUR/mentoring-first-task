import { Routes, provideRouter } from '@angular/router';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { Page404Component } from './pages/page404/page404.component';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UserListComponent },
    { path: '404', component: Page404Component },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};

