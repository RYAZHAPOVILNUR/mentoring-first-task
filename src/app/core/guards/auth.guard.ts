import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthLocalStorageService } from '../services/backend-users/backend-local-storage.service';

export const AuthGuard: CanActivateFn = () => {
  const authService: AuthLocalStorageService = inject(AuthLocalStorageService);
  const router: Router = inject(Router);
  let token = authService.getTokenFromLocalStorage()
  if (token) {
    return true;
  }
  return router.createUrlTree(['/login']);
};