import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usersReducer } from './states/users/users.reducer';
import { UsersEffects } from './states/users/users.effects';
import { routes } from './app.routes';
import {todosReducer} from "./states/todos/todos.reducer";
import {TodoEffects} from "./states/todos/todos.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideStore({
      users: usersReducer,
      todos: todosReducer,
    }),
    provideEffects([UsersEffects]),
    provideEffects([TodoEffects]),
  ]
};
