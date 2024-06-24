import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";

import { reducers } from "./store/reducers";
import { routes } from "./app.routes";
import { UsersEffects } from "./store/effects";


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideStore({users: reducers}), provideEffects(UsersEffects), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })],
};
