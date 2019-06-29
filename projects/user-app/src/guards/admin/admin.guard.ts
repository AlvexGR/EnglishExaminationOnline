import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { UserService } from "@app/src/services/user/user.service";
import { UserRole } from "@lib/models/user.model";
import { AppRoutesName } from "@lib/helpers/utility.helper";

@Injectable({
  providedIn: "root"
}) // You must be admin to pass this guard
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isAdmin) {
      return true;
    }
    this.router.navigate([`/${AppRoutesName.logIn}`], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
