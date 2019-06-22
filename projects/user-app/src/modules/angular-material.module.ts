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
  MatDividerModule,
  MatSnackBarModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule
  ]
})
export class AngularMaterialModule {}
