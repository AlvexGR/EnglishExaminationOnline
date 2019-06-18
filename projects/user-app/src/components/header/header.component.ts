import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utility } from '@lib/helpers/utility.helper';

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
    this.navigateTo(`/${Utility.appRoutesName.home}`);
  }

  goToLogIn(): void {
    this.navigateTo(`/${Utility.appRoutesName.logIn}`);
  }

  goToSignUp(): void {
    this.navigateTo(`/${Utility.appRoutesName.signUp}`);
  }

  goToAdmin(): void {
    this.navigateTo(`/${Utility.appRoutesName.admin}`);
  }
}
