import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './_services/token.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appReducer } from './_store/User/User.Reducer';
import { UsersEffects } from './_store/User/User.Effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptors([tokenInterceptor])),
        provideAnimations(),
        provideAnimationsAsync(),
        provideToastr(),
        provideStore({ app: appReducer }),
        provideEffects([UsersEffects]),
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
            name: 'NgRx Standalone App',
        }),
        provideRouterStore(),
    ],
};
