import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularMaterialModule } from "./angular-material.module";
import { WebStorage } from "@lib/helpers/utility.helper";

// Services
import { UserService } from "../services/user/user.service";

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
import { MultipleChoiceComponent } from "../components/english-testing/multiple-choice/multiple-choice.component";
import { TestPageComponent } from "../components/english-testing/test-page/test-page.component";
import { HistoryComponent } from "../components/english-testing/history/history.component";
import { SuccessFieldComponent } from "../components/notification/success-field/success-field.component";
import { PageNotFoundComponent } from "../components/notification/page-not-found/page-not-found.component";

export function initData(userService: UserService) {
  return async () => {
    // Check local storage
    const userId = WebStorage.getItemLocal("userId");
    const accessToken = WebStorage.getItemLocal("accessToken");
    if (userId && accessToken) {
      await userService.getThenSet(userId, accessToken);
      return;
    }
  };
}

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
    ErrorFieldComponent,
    MultipleChoiceComponent,
    TestPageComponent,
    HistoryComponent,
    SuccessFieldComponent,
    PageNotFoundComponent
  ],
  imports: [
    // Module import order matters
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    AppRoutingModule // App routing should be last
  ],
  providers: [
    UserService,
    {
      // APP_INITIALIZER (built-in token) is a function, which will be executed when application is initialized.
      // It means you can set it up as a factory in providers section of your AppModule class
      // and the application will wait until it completes.
      // https://angular.io/guide/dependency-injection-providers#predefined-tokens-and-multiple-providers
      provide: APP_INITIALIZER,
      useFactory: initData,
      deps: [UserService], // list of dependencies to inject into initData()
      multi: true // will provide as multi-provider, set to false will override the default providers
    }
  ],
  bootstrap: [MainComponent]
})
export class AppModule {}
