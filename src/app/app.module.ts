import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin'
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import * as hero from './hero'

const MODULES = [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  NgxsModule.forRoot([]),
  NgxsRouterPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
  hero.ViewsModule,
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: MODULES,
  bootstrap: [ AppComponent ],
})
export class AppModule { }
