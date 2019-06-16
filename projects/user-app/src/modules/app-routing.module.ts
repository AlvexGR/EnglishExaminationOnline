import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../components/home/home.component";
import { LogInComponent } from "../components/log-in/log-in.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { AdminComponent } from "../components/admin/admin.component";

export const routesName = {
  logIn: "log-in",
  signUp: "sign-up",
  admin: "admin",
  home: "",
  profile: "profile"
};

const routes: Routes = [
  {
    path: routesName.home,
    component: HomeComponent
  },
  {
    path: routesName.logIn,
    component: LogInComponent
  },
  {
    path: routesName.signUp,
    component: SignUpComponent
  },
  {
    path: routesName.admin,
    component: AdminComponent
  },
  {
    path: routesName.profile,
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
