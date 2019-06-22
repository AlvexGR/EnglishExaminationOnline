import { Injectable, OnInit, OnDestroy } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "@app/src/services/user/user.service";
import { UserType } from "@lib/models/user.model";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate, OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

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
