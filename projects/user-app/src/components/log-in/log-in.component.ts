import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "@app/src/services/user/user.service";
import { StatusCode } from '@lib/helpers/utility.helper';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent {
  logInForm: FormGroup;
  waitingForResponse = false;
  hasError = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.logInForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get username(): AbstractControl {
    return this.logInForm.get("username");
  }

  get password(): AbstractControl {
    return this.logInForm.get("password");
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
    }
  }
}
