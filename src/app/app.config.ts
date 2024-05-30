import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { usersFeature} from "@state/users/users.reducer";
import * as userEffects from "./state/users/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      [usersFeature.name]: usersFeature.reducer,
    }),
    provideEffects(
      userEffects,
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly:!isDevMode(),
    })
  ],
};
