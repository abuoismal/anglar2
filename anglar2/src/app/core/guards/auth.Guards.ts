
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";


// Auth Guard to protect routes from unauthorized access
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  // Check if token exists in localStorage
  if (localStorage.getItem('token') != null) {
    return true; // Allow access
  } else {
    // Redirect to login page if not authenticated
    router.navigate(['/auth/login']);
    return false; // Block access
  }
};

