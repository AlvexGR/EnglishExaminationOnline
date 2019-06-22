import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { UserService } from "@app/src/services/user/user.service";
import { UserType } from "@lib/models/user.model";

@Injectable({
  providedIn: "root"
}) // You must be admin to pass this guard
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return (
      this.userService.currentUser &&
      this.userService.currentUser.role === UserType.admin
    );
  }
}