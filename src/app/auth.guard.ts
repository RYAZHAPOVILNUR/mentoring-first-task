import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  if (userService.isAdmin) {
    return true;
  } else {
    router.navigate(['/todo']);
    return false;
  }
};
