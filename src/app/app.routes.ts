import { Routes } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutHomeComponent } from './pages/layout-home/layout-home.component';

export const routes: Routes = [
    {
        path: '',
        component: HeaderComponent,
        children: [
            {
                path: '',
                component: LayoutHomeComponent,
            },
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/users/users-list/users-list.component').then(
                        m => m.UsersListComponent
                    ),
            },
        ],
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
