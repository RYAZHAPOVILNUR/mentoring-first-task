import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { usersFeature } from './pages/users/lib/+state/users.reducer'
import { environment } from '../environments/environment.development'
import { API_URL } from './pages/users/lib/api-url.token'

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		importProvidersFrom(HttpClientModule),
		provideAnimationsAsync(),
		provideStore({
			[usersFeature.name]: usersFeature.reducer
		}),
		provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
		provideHttpClient(),
		{
			provide: API_URL,
			useValue: environment.apiUsersUrl
		}
	]
}
