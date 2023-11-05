import { inject } from '@angular/core'; 
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/decoded-token.model';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const path = route.routeConfig?.path;
  if (path === 'login') {
    if (!token) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }

  if (!token) {
      router.navigate(['/login']);
      return false;
  }

  const decodedToken: DecodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
      router.navigate(['/unauthorized']);
      return false;
  }

  return true;
};
