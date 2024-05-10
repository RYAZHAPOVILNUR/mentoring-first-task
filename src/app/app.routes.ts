import { Routes, provideRouter } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list/user-list.component';
import { Page404Component } from './pages/page404/page404.component';
import { ApplicationConfig } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { MaterialsFolderComponent } from './components/materials/material-element/materials-folder/materials-folder.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'materials', component: MaterialsComponent },
  { path: 'materials/folder/:id', component: MaterialsFolderComponent },
  { path: '404', component: Page404Component },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

