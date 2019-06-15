import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    this.navigateTo("/");
  }

  goToLogIn(): void {
    this.navigateTo("/logIn");
  }

  goToSignUp(): void {
    this.navigateTo("/signUp");
  }

  goToAdmin(): void {
    this.navigateTo("/admin");
  }
}
