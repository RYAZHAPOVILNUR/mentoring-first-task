import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserReducer } from './core/state/users/users.reducer';
import { CustomerEffects } from './core/state/users/users.effects';
import { FolderReducer } from './core/state/material/folders/folders.reducer';
import { FoldersEffects } from './core/state/material/folders/folders.effects';
import { MaterialReducer } from './core/state/material/materials/materials.reducer';
import { MaterialsEffects } from './core/state/material/materials/materials.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore({ 'Users': UserReducer, 'Folders': FolderReducer, 'Materials': MaterialReducer }),
    provideEffects(CustomerEffects, FoldersEffects, MaterialsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideClientHydration(),
  ],

};

