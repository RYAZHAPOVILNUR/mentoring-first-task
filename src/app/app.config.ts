import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideState, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {usersFeauture} from "./store/Users/Users.reducer";
import {UsersEffects} from "./store/Users/Users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideStore(),
    provideState(usersFeauture),
    provideEffects(UsersEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
