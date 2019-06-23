import { Component, Input } from "@angular/core";

@Component({
  selector: "app-error-field",
  templateUrl: "./error-field.component.html",
  styleUrls: ["./error-field.component.css"]
})
export class ErrorFieldComponent {
  private _errorMessage: string;

  @Input()
  set errorMessage(errorMessage: string) {
    this._errorMessage = "<No error>";
    if (errorMessage) {
      this._errorMessage = errorMessage;
    }
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
