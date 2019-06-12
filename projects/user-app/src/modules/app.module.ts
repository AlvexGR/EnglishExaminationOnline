import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from '../components/home/home.component';
import { MainComponent } from '../components/main/main.component';
import { LogInComponent } from '../components/log-in/log-in.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
