import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  return userService.isAdmin ? true : router.navigate(['users']).then((result: boolean): boolean => false);
};
