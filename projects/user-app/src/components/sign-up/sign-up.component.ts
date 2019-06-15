import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent {
  signUpForm: FormGroup;
  waitingForResponse = false;
  error = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
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
    this.waitingForResponse = true;
    const result = await this.authService.logIn();
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.waitingForResponse = false;
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
}
