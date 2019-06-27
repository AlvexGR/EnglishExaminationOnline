import { Component, OnInit } from "@angular/core";
import { UserService } from '@app/src/services/user/user.service';
import { WebStorage, AppRoutesName } from '@lib/helpers/utility.helper';
import { Router } from '@angular/router';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    // Because routeLinkActive will always set "/" to active
    // we need to change home route from "" to "/home"
    // but there isn't any default route property => this is a work around
    this.router.navigate([`/${AppRoutesName.home}`]);
  }

  async ngOnInit(): Promise<void> {
    if (!this.userService.currentUser) {
      // Check local storage then get user by Id
      let userId = WebStorage.getItemLocal("userId");
      let accessToken = WebStorage.getItemLocal("accessToken");
      if (userId && accessToken) {
        await this.userService.getThenSet(userId, accessToken);
        return;
      }

      // Check session storage
      userId = WebStorage.getItemSession("userId");
      accessToken = WebStorage.getItemSession("accessToken");

      if (userId && accessToken) {
        await this.userService.getThenSet(userId, accessToken);
        return;
      }
    }
  }
}
