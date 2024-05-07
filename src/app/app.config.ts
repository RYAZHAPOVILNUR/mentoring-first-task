import {ApplicationConfig, isDevMode} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {provideHttpClient} from '@angular/common/http'
import {provideState, provideStore} from '@ngrx/store'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {usersReducer} from './users/store/users.reducer'
import {provideEffects} from '@ngrx/effects'
import {UsersEffect} from './users/store/users.effect'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore(),
    provideState({name: 'users', reducer: usersReducer}),
    provideStoreDevtools({maxAge: 25, logOnly: !isDevMode()}),
    provideEffects([UsersEffect]),
  ],
}
