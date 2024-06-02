import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { HeaderComponent } from './pages/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LayoutHomeComponent } from './pages/layout-home/layout-home.component';
import { FormsTestComponent } from './pages/forms-test/forms-test.component';
import { DisplayViewComponent } from './pages/display-view/display-view.component';

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
                component: UsersListComponent,
            },
            {
                path: 'forms',
                component: FormsTestComponent,
            },
            {
                path: 'display',
                component: DisplayViewComponent,
            },
        ],
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
