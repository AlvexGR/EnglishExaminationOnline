import { Component, Input } from "@angular/core";

@Component({
  selector: "app-error-field",
  templateUrl: "./error-field.component.html"
})
export class ErrorFieldComponent {
  private _errorMessage: string;

  @Input()
  set errorMessage(errorMessage: string) {
    if (errorMessage) {
      this._errorMessage = errorMessage;
    }
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
