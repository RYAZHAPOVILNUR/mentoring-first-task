import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { HttpClientModule, provideHttpClient } from '@angular/common/http'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { environment } from '../environments/environment.development'
import { API_URL } from './pages/users/lib/api-url.token'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    {
      provide: API_URL,
      useValue: environment.apiUsersUrl
    }
  ]
}
