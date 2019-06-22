import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "@app/src/services/user/user.service";

@Injectable({
  providedIn: "root"
}) // You must login to pass this guard
export class LogInGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.currentUser) {
      return true;
    }
    return false;
  }
}
