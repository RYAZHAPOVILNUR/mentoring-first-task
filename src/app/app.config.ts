import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { UserCardComponent } from './users/components/user-card/user-card.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';
import { usersReducer } from './users/store/users/users.reducers';
import { userEffects } from './users/store/users';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    UserCardComponent,
    UsersListComponent,
    provideAnimationsAsync(),
    provideStore({ users: usersReducer }),
    provideEffects(userEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }), provideAnimationsAsync(),
  ]
};
