import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutesName } from "@lib/helpers/utility.helper";
import { UserService } from "@app/src/services/user/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _currentUserSubscription: Subscription;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this._currentUserSubscription = this.userService.userObservable.subscribe(currentUser => {
      if (!currentUser) {
        // User logged in
        document.getElementById("logInOutButton").innerText = "Log In";
      } else {
        // User logged out
        document.getElementById("logInOutButton").innerText = "Log Out";
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leak
    this._currentUserSubscription.unsubscribe();
  }

  navigateTo(location: string): void {
    this.router.navigate([location]);
  }

  goToHome(): void {
    this.navigateTo(`/${AppRoutesName.home}`);
  }

  goToLogIn(): void {
    if (document.getElementById("logInOutButton").innerText === "Log Out") {
      this.userService.logOut();
    }
    this.navigateTo(`/${AppRoutesName.logIn}`);
  }

  goToSignUp(): void {
    this.navigateTo(`/${AppRoutesName.signUp}`);
  }

  goToAdmin(): void {
    this.navigateTo(`/${AppRoutesName.admin}`);
  }
}
