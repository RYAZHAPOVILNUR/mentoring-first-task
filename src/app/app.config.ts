import { ApplicationConfig, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { createFeature, provideStore } from '@ngrx/store'
import { usersFeature } from './state/users/users.reducers'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import * as usersEffects from './state/users/users.effects'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      [usersFeature.name]: usersFeature.reducer,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideEffects(usersEffects),
  ],
}
