import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component'
import { UserCardComponent } from './component/user-card/user-card.component'

const routes: Routes = [
  {path: "users", component: UserListComponent },
  {path: "userCard", component: UserCardComponent},
  {path:"nothing", redirectTo:'', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }