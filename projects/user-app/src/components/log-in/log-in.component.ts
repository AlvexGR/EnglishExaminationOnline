import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "@app/src/services/user/user.service";
import { StatusCode, AppRoutesName } from "@lib/helpers/utility.helper";
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
      password: ["", Validators.required]
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
    this.notifyLogIn();
    //this.router.navigate([`/${AppRoutesName.home}`]);
    this.router.navigate([`/${AppRoutesName.profile}`]);
  }

  get username(): AbstractControl {
    return this.logInForm.get("username");
  }

  get password(): AbstractControl {
    return this.logInForm.get("password");
  }
}
