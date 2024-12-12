import {ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import {userReducer, USERS_FEATURE_KEY} from "./store/user.reducer";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import { provideEffects } from '@ngrx/effects';
import * as loadUserEffect from "./store/user.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    provideStore({
      [USERS_FEATURE_KEY]: userReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(loadUserEffect)
],
};
