import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutesName } from "@lib/helpers/utility.helper";
import { UserService } from "@app/src/services/user/user.service";
import { Subscription } from "rxjs";
import { UserType } from "@lib/models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _currentUserSubscription: Subscription;
  private _isAdmin: boolean;
  private _isLoggedIn: boolean;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this._currentUserSubscription = this.userService.userObservable.subscribe(
      currentUser => {
        if (!currentUser) {
          // User logged out
          this._isLoggedIn = false;
          this._isAdmin = false;
        } else {
          // User logged in
          this._isAdmin = currentUser.role === UserType.admin;
          this._isLoggedIn = true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    this._currentUserSubscription.unsubscribe();
  }

  goToHome(): void {
    this.router.navigate([`/${AppRoutesName.home}`]);
  }

  goToLogIn(): void {
    this.router.navigate([`/${AppRoutesName.logIn}`]);
  }

  goToSignUp(): void {
    this.router.navigate([`/${AppRoutesName.signUp}`]);
  }

  goToAdmin(): void {
    this.router.navigate([`/${AppRoutesName.admin}`]);
  }

  goToTestPage(): void {
    this.router.navigate([`/${AppRoutesName.testPage}`]);
  }

  goToProfile(): void {
    this.router.navigate([`/${AppRoutesName.profile}`]);
  }

  goToHistory(): void {
    this.router.navigate([`/${AppRoutesName.history}`]);
  }

  logOut(): void {
    this.userService.logOut();
    this.router.navigate([`/${AppRoutesName.logIn}`]);
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }
}
