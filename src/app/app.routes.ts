import { Routes } from '@angular/router';
import {UsersListComponent} from "./components/admin/components/users-list/users-list.component";
import {HeaderComponent} from "./components/admin/components/header/header.component";
import {TodoListComponent} from "./components/admin/components/todo-list/todo-list.component";
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AuthGuard} from "./guards/auth.guard";



export const routes: Routes = [
  {
    path:'login',
    component: LoginComponent
  },

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    loadChildren: () => import('./components/admin/admin-routing/admin-routing.module').then(m => m.AdminRoutingModule)
  },

  {path: '**', component: NotFoundComponent}
];
