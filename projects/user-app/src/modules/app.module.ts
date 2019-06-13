import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "../components/home/home.component";
import { MainComponent } from "../components/main/main.component";
import { LogInComponent } from "../components/log-in/log-in.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { HeaderComponent } from "../components/header/header.component";
import { FooterComponent } from "../components/footer/footer.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { AdminComponent } from "../components/admin/admin.component";

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    LogInComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule {}
