import {ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {USERS_FEATURE_KEY, usersReducer} from "./states/users/users.reducer";
import * as userEffects from "./states/users/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
        [USERS_FEATURE_KEY]: usersReducer,
      }
    ),
  provideEffects(
    userEffects
  ),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        autoPause: true,
        trace: false,
        traceLimit: 75,
    }),
],
};

