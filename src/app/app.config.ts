import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import { USERS_FEATURE_KEY, usersReducer } from './users-list/store/users-list.reducer';
import { UsersEffects } from './users-list/store/users-list.effects';
import { TODOS_LIST_FEATURE_KEY, todosListReducer } from './todos-list/store/todos-list.reducer';
import { TodosListEffects } from './todos-list/store/todos-list.effects';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideStore(),

    // Users feature
    provideState(USERS_FEATURE_KEY, usersReducer),
    provideEffects(UsersEffects),

    // Todos feature
    provideState(TODOS_LIST_FEATURE_KEY, todosListReducer),
    provideEffects(TodosListEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'Mentoring-first-task',
    }),
  ],
};
