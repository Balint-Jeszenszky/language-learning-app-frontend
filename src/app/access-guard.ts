import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class AccessGuard implements CanActivate {
  private loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(loggedIn => this.loggedIn = loggedIn);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.data['requiresLogin']) {
      if (!this.loggedIn && route.data['redirectTo']) {
        this.router.navigate([route.data['redirectTo']]);
      }
      return this.loggedIn;
    }
    if (route.data['requiresLogout']) {
      if (this.loggedIn && route.data['redirectTo']) {
        this.router.navigate([route.data['redirectTo']]);
      }
      return !this.loggedIn;
    }
    return true;
  }
}
