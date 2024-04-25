import { Routes } from '@angular/router'
import { UserListComponent } from './pages/users/users-list.component'
import { HomeComponent } from './pages/home/home.component'
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component'

export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		title: 'home'
	},
	{
		path: 'users',
		component: UserListComponent,
		title: 'users'
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		title: '404'
	}
]
