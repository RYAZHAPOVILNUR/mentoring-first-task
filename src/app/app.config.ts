import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { isDevMode } from '@angular/core'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideEffects } from '@ngrx/effects'
import { usersReducer } from './state/users/users.reducer'
import { usersEffects } from './state/users/users.effects'
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users: usersReducer,
    }),
    provideEffects({ usersEffects }),
    provideStoreDevtools({
      maxAge: 30,
      logOnly: !isDevMode,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
}
