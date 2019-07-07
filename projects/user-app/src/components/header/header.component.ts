import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@app/src/services/user/user.service";
import { Subscription } from "rxjs";
import { UserRole } from "@lib/models/user.model";
import { AppRoutesName } from "@lib/helpers/utility.helper";
import { LoadingService } from "@app/src/services/loading/loading.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _currentUserSubscription: Subscription;
  private _loadingSubscription: Subscription;
  private _isAdmin: boolean;
  private _isLoggedIn: boolean;
  private _isLoading: boolean;

  get homeRoute(): string {
    return `/${AppRoutesName.home}`;
  }

  get logInRoute(): string {
    return `/${AppRoutesName.logIn}`;
  }

  get signUpRoute(): string {
    return `/${AppRoutesName.signUp}`;
  }

  get profileRoute(): string {
    return `/${AppRoutesName.profile}`;
  }

  get historyRoute(): string {
    return `/${AppRoutesName.history}`;
  }

  get adminRoute(): string {
    return `/${AppRoutesName.admin}`;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  constructor(
    private router: Router,
    private _userService: UserService,
    private _loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._currentUserSubscription = this._userService.userObservable.subscribe(
      currentUser => {
        if (!currentUser) {
          // User logged out
          this._isLoggedIn = false;
          this._isAdmin = false;
        } else {
          // User logged in
          this._isAdmin = currentUser.role === UserRole.admin;
          this._isLoggedIn = true;
        }
      }
    );

    this._loadingSubscription = this._loadingService.loadingObservable.subscribe(
      isLoading => {
        this._isLoading = isLoading;
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    if (this._currentUserSubscription) {
      this._currentUserSubscription.unsubscribe();
    }

    if (this._loadingSubscription) {
      this._loadingSubscription.unsubscribe();
    }
  }

  async logOut(): Promise<void> {
    await this._userService.logOut();
  }
}
