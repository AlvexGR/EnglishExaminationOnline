import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularMaterialModule } from "./angular-material.module";

// Services
import { UserService } from '../services/user/user.service';

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
    HttpClientModule,
    AngularMaterialModule
  ],
  providers: [UserService],
  bootstrap: [MainComponent]
})
export class AppModule {}
