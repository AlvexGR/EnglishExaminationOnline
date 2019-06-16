import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routesName } from '@app/src/modules/app-routing.module';

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
    this.navigateTo(`/${routesName.home}`);
  }

  goToLogIn(): void {
    this.navigateTo(`/${routesName.logIn}`);
  }

  goToSignUp(): void {
    this.navigateTo(`/${routesName.signUp}`);
  }

  goToAdmin(): void {
    this.navigateTo(`/${routesName.admin}`);
  }
}
