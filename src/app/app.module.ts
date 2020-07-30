import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import * as hero from './hero'

const MODULES = [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  NgxsModule.forRoot([]),
  NgxsLoggerPluginModule.forRoot(),
  hero.ViewsModule,

  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: MODULES,
  bootstrap: [ AppComponent ]
})
export class AppModule { }
