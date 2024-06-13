import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
   {path: 'users', component: UserListComponent},
   {path: '', redirectTo: '/users', pathMatch: 'full'},
   {path: '**', component: NotFoundComponent},
];
