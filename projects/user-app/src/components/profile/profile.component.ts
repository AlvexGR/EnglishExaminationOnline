import { Component, OnInit } from "@angular/core";
import { UserService } from "@app/src/services/user/user.service";
import { Router } from "@angular/router";
import { AppRoutesName, StatusCode } from "@lib/helpers/utility.helper";
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
    this.initProfileForm();
  }

  initProfileForm() {
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

  async updateProfile(): Promise<void> {
    if (this.profileForm.invalid) {
      return;
    }

    this.resetStatus();

    this.waitingForResponse = true;
    const updatedUser = this.userService.createFromObj({
      _id: this.userService.currentUser._id,
      username: this.username.value,
      password: this.newPassword.value,
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      gender: this.gender.value,
      dateOfBirth: this.dateOfBirth.value,
      role: this.userService.currentUser.role
    });

    const result = await this.userService.update(
      updatedUser,
      this.currentPassword.value
    );
    this.waitingForResponse = false;
    if (result.statusResponse.status !== StatusCode.Ok) {
      this.error = true;
      this.errorMessage = "Cập nhật thông tin không thành công";
      const validation = result.validation;
      if (validation) {
        if (!validation.username) {
          this.usernameError = true;
          this.usernameErrorMessage = "Tên đăng nhập đã tồn tại";
        }
        if (!validation.email) {
          this.emailError = true;
          this.emailErrorMessage = "Địa chỉ Email đã tồn tại";
        }
        if (!validation.currentPassword) {
          this.currentPasswordError = true;
          this.currentPasswordErrorMessage = "Mật khẩu hiện tại không đúng";
        }
      }
    } else {
      this.success = true;
      this.successMessage = "Cập nhật thông tin thành công";
    }
  }

  resetStatus(): void {
    this.error = this.emailError = this.usernameError = this.currentPasswordError = this.success = false;
  }

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
      "currentPasswordBox"
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

  get currentPassword(): AbstractControl {
    return this.profileForm.get("currentPassword");
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
