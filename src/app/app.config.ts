import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools'; 
import * as loadUserEffect from './+state/user.effects';
import { USER_KEY, userReducer } from './+state/user.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      [USER_KEY]: userReducer,
    }),
    provideEffects(),
    provideEffects(
      loadUserEffect
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(), 
      autoPause: true,
      trace: false,
      traceLimit: 75,
    })
  ]
};