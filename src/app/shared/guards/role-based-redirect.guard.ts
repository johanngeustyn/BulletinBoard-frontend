import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/decoded-token.model';

export const roleBasedRedirectGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  const decodedToken: DecodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (userRole === 'admin') {
    router.navigate(['/admin/dashboard']);
    return false;
  } else if (userRole === 'viewer') {
    router.navigate(['/viewer/dashboard']);
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
