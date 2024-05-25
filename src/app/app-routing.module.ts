import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component'; 
import { UsersListComponent } from './components/users-list/users-list.component';  
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Main',
    component: MainComponent,
  },
  {
    path: '', redirectTo: 'users-list', pathMatch: 'full'
  },
  {
    path: 'users',
    title: 'User Card', 
    component: UsersListComponent
  },
  {
    path:'**',
    component: EmptyRouteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
