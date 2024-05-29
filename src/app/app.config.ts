import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UsersApiService } from './shared/services/users-api.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { USERS_FEATURE_KEY } from './libs/users/data-access/src/lib/state/users.selectors';
import { reducer } from './libs/users/data-access/src/lib/state/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { addUserEffects, deleteUserEffects, editUserEffects, loadUsersEffects, setUsersEffects } from './libs/users/data-access/src/lib/state/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    UsersApiService,
    provideAnimationsAsync(),
    provideRouterStore(),
    provideStore({
        router: routerReducer,
        [USERS_FEATURE_KEY]: reducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects({
      loadUsersEffects,
      deleteUserEffects,
      addUserEffects,
      editUserEffects,
      setUsersEffects,
    }),
  ]
};
