import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducers } from './users-list/store/users.reducers';
import { todosReducer } from './todos/store/todos.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './users-list/store/users.effects';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({ keys: ['users', 'todos'], rehydrate: true })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
        users: userReducers,
        todos: todosReducer,
      },
      { metaReducers: [localStorageSyncReducer] },
    ),
    provideEffects(UsersEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
]
};
