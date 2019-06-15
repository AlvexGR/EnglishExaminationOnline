import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import {
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
} from '@angular/material';

// Services
import { AuthenticationService } from "../services/authentication.service";

// Components
import { HomeComponent } from "../components/home/home.component";
import { MainComponent } from "../components/main/main.component";
import { LogInComponent } from "../components/log-in/log-in.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { AdminComponent } from "../components/admin/admin.component";
import { ErrorFieldComponent } from "../components/notification/error-field/error-field.component";

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    LogInComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    AdminComponent,
    ErrorFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [AuthenticationService],
  bootstrap: [MainComponent]
})
export class AppModule {}
