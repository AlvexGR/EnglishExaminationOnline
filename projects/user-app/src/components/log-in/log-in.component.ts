import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "@app/src/services/user/user.service";
import { StatusCode, AppRoutesName, WebStorage } from "@lib/helpers/utility.helper";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  waitingForResponse = false;
  hasError = false;
  errorMessage: string;
  passwordState: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      rememberMe: [false]
    });
  }

  notifyLogIn() {
    // if (!this.userService.currentUser) {
    //   return;
    // }
    // this.snackBar.open(
    //   `Đăng nhập thành công. Xin chào ${
    //     this.userService.currentUser.firstName
    //   }!`,
    //   "X",
    //   {
    //     duration: 3000
    //   }
    // );
  }

  setPasswordVisibility(): void {
    const password = document.getElementById("passwordBox") as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      this.passwordState = true;
    } else {
      password.type = "password";
      this.passwordState = false;
    }
  }

  async logIn(): Promise<void> {
    if (this.logInForm.invalid) {
      return;
    }

    const username: string = this.username.value;
    const password: string = this.password.value;

    if (!username || !password) {
      return;
    }

    this.waitingForResponse = true;
    const result = await this.userService.logIn(username, password);
    this.waitingForResponse = false;
    this.hasError = result.status === StatusCode.BadRequest;
    if (this.hasError) {
      this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng";
      return;
    }
    // this.notifyLogIn();

    // Clear all first to prevent conflict
    WebStorage.clearBoth();
    if (this.rememberMe.value) {
      // Store current user Id and access token to local store
      WebStorage.setItemLocal("userId", this.userService.currentUser._id);
      WebStorage.setItemLocal("accessToken", this.userService.accessToken);
    } else {
      // Store only in session store
      WebStorage.setItemSession("userId", this.userService.currentUser._id);
      WebStorage.setItemSession("accessToken", this.userService.accessToken);
    }

    this.router.navigate([`/${AppRoutesName.home}`]);
  }

  get username(): AbstractControl {
    return this.logInForm.get("username");
  }

  get password(): AbstractControl {
    return this.logInForm.get("password");
  }

  get rememberMe(): AbstractControl {
    return this.logInForm.get("rememberMe");
  }
}
