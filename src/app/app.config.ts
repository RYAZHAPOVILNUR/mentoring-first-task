import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UsersApiService } from './shared/services/users-api.service';
import { UsersService } from './shared/services/users.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    UsersApiService,
    UsersService,
    provideAnimationsAsync(),
  ]
};
