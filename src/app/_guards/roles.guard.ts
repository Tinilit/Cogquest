import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token);
    const expectedRoles = route.data['roles'] as Array<string>;
    const currentRoles = tokenPayload.roles.split(',') as Array<string>;

    return (expectedRoles == null ||
      expectedRoles.filter((value, index) => currentRoles.indexOf(value) !== -1).length > 0
    );
  }
}
