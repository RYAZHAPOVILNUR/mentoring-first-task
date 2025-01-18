import { Routes } from '@angular/router';
import { UsersComponent } from './components/users-list/users.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './components/home-page/homePage.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocationComponent, } from './components/location/location.component';
import { TodosListComponent } from './components/todos-list.component/todos-list.component';




export const routes: Routes = [
    {path: 'users', component: UsersComponent},


    {path: 'header', component: HeaderComponent},

    {path: '', component: HomePageComponent},

    {path: 'footer',component: FooterComponent},

    {path: 'location',component: LocationComponent},

    {path: 'todos', component: TodosListComponent}
    
    ];


