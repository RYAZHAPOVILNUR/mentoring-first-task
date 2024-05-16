import { Routes, provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'users', loadComponent: () => import('./components/user-list/user-list/user-list.component').then(m => m.UserListComponent) },
  { path: 'materials', loadComponent: () => import('./components/materials/materials.component').then(m => m.MaterialsComponent) },
  { path: 'materials/folder/:id', loadComponent: () => import('./components/materials/material-element/materials-folder/materials-folder.component').then(m => m.MaterialsFolderComponent) },
  { path: 'users-back', loadComponent: () => import('./components/users-data-from-backend/users-data-from-backend.component').then(m => m.UsersDataFromBackendComponent), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./components/backend-login/backend-login.component').then(m => m.BackendLoginComponent) },
  { path: '404', loadComponent: () => import('./pages/page404/page404.component').then(m => m.Page404Component) },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

