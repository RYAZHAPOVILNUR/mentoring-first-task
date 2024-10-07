import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import {provideState, provideStore} from "@ngrx/store";
import {usersReducer} from "./store/users.reducer";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {UsersEffects} from "./store/users.effect";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'users', reducer: usersReducer }),
    provideEffects(UsersEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
