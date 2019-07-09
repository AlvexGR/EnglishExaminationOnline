import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatDividerModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatExpansionModule,
  MatIconModule,
  MatTooltipModule
} from "@angular/material";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class AngularMaterialModule {}
