import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutesName } from '@lib/helpers/utility.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private router: Router,
  ) { }

  navigateTo(location: string): void {
    this.router.navigate([location]);
  }

  goToHome(): void {
    this.navigateTo(`/${AppRoutesName.home}`);
  }

  goToLogIn(): void {
    this.navigateTo(`/${AppRoutesName.logIn}`);
  }

  goToSignUp(): void {
    this.navigateTo(`/${AppRoutesName.signUp}`);
  }

  goToAdmin(): void {
    this.navigateTo(`/${AppRoutesName.admin}`);
  }
}
