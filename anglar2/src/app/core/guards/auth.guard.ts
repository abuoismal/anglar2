
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';



// Auth Guard to protect routes from unauthorized access
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  // Check if user is authorized
  if (auth.authorized()) {
    return true;
  } else {
    // Redirect to login page if not authorized
    return router.createUrlTree(['login']);
  }
};
