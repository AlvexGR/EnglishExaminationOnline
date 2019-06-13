import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"]
})
export class LogInComponent {
  logInForm: FormGroup;
  waitingForResponse = false;

  constructor(private formBuilder: FormBuilder) {
    this.logInForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get myForm() {
    return this.logInForm.controls;
  }

  onSubmit(): void {}
}
