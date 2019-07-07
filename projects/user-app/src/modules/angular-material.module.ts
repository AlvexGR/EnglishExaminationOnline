import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,
  MatSnackBarModule,
  MatProgressBarModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class AngularMaterialModule {}
