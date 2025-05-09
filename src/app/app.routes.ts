import { Routes } from '@angular/router';
import { MainComponent } from './components/main-page/main-page.component';
import { UserListComponent } from './components/users-list/user-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AdminAuthComponent } from './auth/admin.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    
    {
        path: '', component: MainComponent, canActivate: [AuthGuard]
    },
    {
        path: 'users', component: UserListComponent, canActivate: [AuthGuard]
    },
    
    {
        path: 'todo', component: TodoListComponent, canActivate: [AuthGuard]
        
    },
    
    {
        path: 'admin', component: AdminAuthComponent, 
    }
   
];
