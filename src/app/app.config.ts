import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { USERS_FEATURE_KEY, usersReducer } from './users-list/store/users-list.reducer';
import { UsersEffects } from './users-list/store/users-list.effects';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideStore(),
    provideState(USERS_FEATURE_KEY, usersReducer),
    provideEffects(UsersEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'Mentoring-first-task',
    }),
  ],
};
