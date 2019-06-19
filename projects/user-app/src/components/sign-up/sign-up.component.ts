import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { UserService } from "@app/src/services/user/user.service";
import { Router } from "@angular/router";
import { AppRoutesName, StatusCode } from "@lib/helpers/utility.helper";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  waitingForResponse = false;
  error = false;
  errorMessage: string;
  emailError = false;
  emailErrorMessage: string;
  usernameError = false;
  usernameErrorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*\\d)(?=\\S*[^\\w\\s])\\S{8,}$"
          )
        ]
      ],
      passwordConfirm: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [""],
      dateOfBirth: [""]
    });
  }

  async signUp(): Promise<void> {
    // Reset errors
    this.error = this.emailError = this.usernameError = false;

    this.waitingForResponse = true;
    const newUser = this.userService.createFromObj({
      username: this.username.value,
      password: this.password.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      gender: this.gender.value,
      dateOfBirth: this.dateOfBirth.value
    });

    const result = await this.userService.signUp(newUser);
    this.waitingForResponse = false;

    if (result.statusResponse.status !== StatusCode.Ok) {
      this.error = true;
      this.errorMessage = result.statusResponse.message;
      return;
    }

    if (
      result.validation &&
      (!result.validation.emailValid || !result.validation.usernameValid)
    ) {
      this.emailError = !result.validation.emailValid;
      this.usernameError = !result.validation.usernameValid;
      this.emailErrorMessage = "Email này đã tồn tại";
      this.usernameErrorMessage = "Tài khoản đăng nhập này đã tồn tại";
      return;
    }

    this.router.navigate([`/${AppRoutesName.logIn}`]);
  }

  get username(): AbstractControl {
    return this.signUpForm.get("username");
  }

  get password(): AbstractControl {
    return this.signUpForm.get("password");
  }

  get passwordConfirm(): AbstractControl {
    return this.signUpForm.get("passwordConfirm");
  }

  get email(): AbstractControl {
    return this.signUpForm.get("email");
  }

  get firstName(): AbstractControl {
    return this.signUpForm.get("firstName");
  }

  get lastName(): AbstractControl {
    return this.signUpForm.get("lastName");
  }

  get gender(): AbstractControl {
    return this.signUpForm.get("gender");
  }

  get dateOfBirth(): AbstractControl {
    return this.signUpForm.get("dateOfBirth");
  }
}
