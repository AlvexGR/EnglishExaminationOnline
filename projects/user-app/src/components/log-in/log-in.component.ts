import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent {
  logInForm: FormGroup;
  waitingForResponse = false;
  error = false;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
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
    this.waitingForResponse = true;
    const result = await this.authService.logIn();
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.waitingForResponse = false;
  }
}
