import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule
} from "@angular/material";

@NgModule({
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatDividerModule],
  exports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatDividerModule]
})
export class AngularMaterialModule {}
