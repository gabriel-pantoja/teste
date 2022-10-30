import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService) { }

  checkAuthemtication(path: string): boolean {
    const loggedIn = this.authService.isLoggedIn();
    if (!loggedIn) {
      this.authService.handleLogin();
    }
    return loggedIn;
  }

  canLoad(router: Route): boolean {
    return this.checkAuthemtication(router.path || '');
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
    return this.checkAuthemtication(activatedRoute.routeConfig?.path || '');
  }
}


