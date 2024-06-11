import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UsersEffects } from './reducers/users.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    provideStore(reducers, { metaReducers }),
    provideEffects(
      UsersEffects
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
