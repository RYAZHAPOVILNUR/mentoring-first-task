import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {UsersListComponent} from "../components/users-list/users-list.component";
import {LoginComponent} from "../../login/login.component";
import {TodoListComponent} from "../components/todo-list/todo-list.component";

const routes: Routes = [
  {
    path: '',component: DashboardComponent,
    children: [
      {
        path: 'users', component: UsersListComponent
      },
      {
        path: 'todos', component: TodoListComponent
      },

      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: '**',redirectTo: 'users', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingRoutingModule { }
