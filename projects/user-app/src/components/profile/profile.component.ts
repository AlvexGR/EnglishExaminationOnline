import { Component, OnInit } from "@angular/core";
import { UserService } from "@app/src/services/user/user.service";
import { Router } from "@angular/router";
import { AppRoutesName } from "@lib/helpers/utility.helper";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  waitingForResponse = false;
  success = false;
  successMessage: string;
  error = false;
  errorMessage: string;
  currentPasswordError = false;
  currentPasswordErrorMessage: string;
  newPasswordError = false;
  newPasswordErrorMessage: string;
  emailError = false;
  emailErrorMessage: string;
  usernameError = false;
  usernameErrorMessage: string;

  firstNameState = true;
  lastNameState = true;
  usernameState = true;
  emailState = true;
  newPasswordState: boolean;
  newPasswordConfirmState: boolean;
  currentPasswordState: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.userService.currentUser) {
      this.router.navigate([`/${AppRoutesName.logIn}`]);
      return;
    }
    const user = this.userService.currentUser;
    this.profileForm = this.formBuilder.group({
      username: [user.username, Validators.required],
      currentPassword: [""],
      newPassword: [
        "",
        [
          Validators.pattern(
            "^(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*\\d)(?=\\S*[^\\w\\s])\\S{8,}$"
          )
        ]
      ],
      newPasswordConfirm: [""],
      email: [user.email, [Validators.required, Validators.email]],
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      gender: [user.gender],
      dateOfBirth: [user.dateOfBirth]
    });
  }

  async updateProfile(): Promise<void> {}

  setFirstNameAccessibility(): void {
    this.firstNameState = !this.firstNameState;
  }

  setLastNameAccessibility(): void {
    this.lastNameState = !this.lastNameState;
  }

  setUsernameAccessibility(): void {
    this.usernameState = !this.usernameState;
  }

  setEmailAccessibility(): void {
    this.emailState = !this.emailState;
  }

  setNewPasswordVisibility(): void {
    const password = document.getElementById(
      "newPasswordBox"
    ) as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      this.newPasswordState = true;
    } else {
      password.type = "password";
      this.newPasswordState = false;
    }
  }

  setNewPasswordConfirmVisibility(): void {
    const password = document.getElementById(
      "newPasswordConfirmBox"
    ) as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      this.newPasswordConfirmState = true;
    } else {
      password.type = "password";
      this.newPasswordConfirmState = false;
    }
  }

  setCurrentPasswordVisibility(): void {
    const password = document.getElementById(
      "currentPasswordState"
    ) as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      this.currentPasswordState = true;
    } else {
      password.type = "password";
      this.currentPasswordState = false;
    }
  }

  get username(): AbstractControl {
    return this.profileForm.get("username");
  }

  get newPassword(): AbstractControl {
    return this.profileForm.get("newPassword");
  }

  get newPasswordConfirm(): AbstractControl {
    return this.profileForm.get("newPasswordConfirm");
  }

  get email(): AbstractControl {
    return this.profileForm.get("email");
  }

  get firstName(): AbstractControl {
    return this.profileForm.get("firstName");
  }

  get lastName(): AbstractControl {
    return this.profileForm.get("lastName");
  }

  get gender(): AbstractControl {
    return this.profileForm.get("gender");
  }

  get dateOfBirth(): AbstractControl {
    return this.profileForm.get("dateOfBirth");
  }
}
