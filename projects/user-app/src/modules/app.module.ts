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
import { ExamService } from "../services/exam/exam.service";
import { LoadingService } from "../services/loading/loading.service";
import { HistoryService } from "../services/history/history.service";

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
import { ExamPageComponent } from "../components/english-testing/exam-page/exam-page.component";
import { SuccessFieldComponent } from "../components/notification/success-field/success-field.component";
import { PageNotFoundComponent } from "../components/notification/page-not-found/page-not-found.component";
import { ExamCardComponent } from "../components/english-testing/exam-card/exam-card.component";
import { PlainParagraphComponent } from "../components/english-testing/plain-paragraph/plain-paragraph.component";
import { HistoryDetailComponent } from "../components/english-testing/history-detail/history-detail.component";
import { HistoryListComponent } from "../components/english-testing/history-list/history-list.component";
import { SectionCreatorComponent } from "../components/english-testing/creators/section-creator/section-creator.component";
import { QuestionCreatorComponent } from "../components/english-testing/creators/question-creator/question-creator.component";
import { TagCreatorComponent } from "../components/english-testing/creators/tag-creator/tag-creator.component";
import { ExamCreatorComponent } from "../components/english-testing/creators/exam-creator/exam-creator.component";

export function initData(userService: UserService) {
  return async () => {
    // Check local storage
    const userId = WebStorage.getItemLocal("userId");
    const accessToken = WebStorage.getItemLocal("accessToken");
    if (userId && accessToken) {
      await userService.getThenSet(userId, accessToken);
    } else {
      WebStorage.clearBoth();
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
    ExamPageComponent,
    SuccessFieldComponent,
    PageNotFoundComponent,
    ExamCardComponent,
    PlainParagraphComponent,
    HistoryDetailComponent,
    HistoryListComponent,
    SectionCreatorComponent,
    QuestionCreatorComponent,
    TagCreatorComponent,
    ExamCreatorComponent
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
    ExamService,
    LoadingService,
    HistoryService,
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
