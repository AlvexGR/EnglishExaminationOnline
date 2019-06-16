import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule],
  exports: [MatToolbarModule, MatButtonModule]
})
export class AngularMaterialModule {}
