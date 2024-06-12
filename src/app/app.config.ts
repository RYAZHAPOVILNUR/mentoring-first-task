import { ApplicationConfig, isDevMode } from '@angular/core';
import {provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RouterReducer, USER_FEATER_KEY } from './store/user.reducer';
import * as UserEffect from './store/user.effects';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({
      [USER_FEATER_KEY]: RouterReducer
    }
    
    ),
    provideEffects(
      UserEffect
    ), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
