import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UsersApiService } from './users-api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { userReducer } from './users-list/store/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({ users: userReducer }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],
};
