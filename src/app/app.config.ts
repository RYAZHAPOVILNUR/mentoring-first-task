import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { USERS_FEATURE, usersReducer } from './store/users.reducer';
import { UsersEffect } from './store/users.effects';

export const API_URL = new InjectionToken<string>('API_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(UsersEffect),
    provideStore({
      [USERS_FEATURE]:usersReducer
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    {provide: API_URL, useValue: 'https://jsonplaceholder.typicode.com/'},
  ]
};
