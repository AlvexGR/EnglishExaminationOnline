import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-field',
  templateUrl: './success-field.component.html',
  styleUrls: ['./success-field.component.css']
})
export class SuccessFieldComponent {
  private _successMessage: string;

  @Input()
  set successMessage(successMessage: string) {
    this._successMessage = "";
    if (successMessage) {
      this._successMessage = successMessage;
    }
  }

  get successMessage() {
    return this._successMessage;
  }

}
