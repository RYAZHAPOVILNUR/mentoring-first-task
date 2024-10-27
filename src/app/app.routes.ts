import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import {MainComponent } from './main/main.component';
export const routes: Routes = [
    {
        path: 'users',
        component: UsersListComponent
    },
    {
        path: 'main',
        component: MainComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
