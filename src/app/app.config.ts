import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { loadUserEffect } from './NGRX/effects';
import * as userEffects from './NGRX/effects';
import { USER_KEY, userReducer } from './NGRX/reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideEffects(userEffects),
    provideStore({ [USER_KEY]: userReducer }),
    provideRouterStore(),
    provideStoreDevtools(),
  ],
};
