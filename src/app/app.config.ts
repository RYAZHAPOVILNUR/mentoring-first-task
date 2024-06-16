import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), 
    provideStore(), 
    provideEffects(), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore({ users: usersReducer }),
    provideEffects([UsersEffects]),
  ]
};
