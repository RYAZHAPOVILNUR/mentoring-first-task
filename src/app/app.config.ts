import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersFeature } from './reducer/users.reducer';
import { loadUsers } from './reducer/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      [usersFeature.name]: usersFeature.reducer,
    }),
    provideEffects({ loadUsers }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
