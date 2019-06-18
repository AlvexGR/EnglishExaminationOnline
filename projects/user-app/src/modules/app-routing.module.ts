import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../components/home/home.component";
import { LogInComponent } from "../components/log-in/log-in.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { AdminComponent } from "../components/admin/admin.component";
import { Utility } from '@lib/helpers/utility.helper';

const routes: Routes = [
  {
    path: Utility.appRoutesName.home,
    component: HomeComponent
  },
  {
    path: Utility.appRoutesName.logIn,
    component: LogInComponent
  },
  {
    path: Utility.appRoutesName.signUp,
    component: SignUpComponent
  },
  {
    path: Utility.appRoutesName.admin,
    component: AdminComponent
  },
  {
    path: Utility.appRoutesName.profile,
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
