import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "../components/home/home.component";
import { LogInComponent } from "../components/log-in/log-in.component";
import { SignUpComponent } from "../components/sign-up/sign-up.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { AdminComponent } from "../components/admin/admin.component";
import { AppRoutesName } from '@lib/helpers/utility.helper';

import { AdminGuard } from '../guards/admin/admin.guard';

const routes: Routes = [
  {
    path: AppRoutesName.home,
    component: HomeComponent
  },
  {
    path: AppRoutesName.logIn,
    component: LogInComponent
  },
  {
    path: AppRoutesName.signUp,
    component: SignUpComponent
  },
  {
    path: AppRoutesName.admin,
    component: AdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: AppRoutesName.profile,
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
