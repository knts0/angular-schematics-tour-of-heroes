import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { NgxsModule } from '@ngxs/store';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>.state';

import { RoutingModule } from './routing.module'
import { DashboardComponent } from './dashboard/dashboard.component';
import { <%= classify(name) %>DetailComponent } from './<%= dasherize(name) %>-detail/<%= dasherize(name) %>-detail.component';
import { <%= classify(namePlural) %>Component } from './<%= dasherize(namePlural) %>/<%= dasherize(namePlural) %>.component';
import { <%= classify(name) %>SearchComponent } from './<%= dasherize(name) %>-search/<%= dasherize(name) %>-search.component';
import { MessagesComponent } from './messages/messages.component';


const VIEW_COMPONENTS = [
    DashboardComponent,
    <%= classify(name) %>DetailComponent,
    <%= classify(namePlural) %>Component,
    <%= classify(name) %>SearchComponent,
    MessagesComponent,
 ]

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      <%= classify(name) %>State
    ]),
    HttpClientInMemoryWebApiModule.forFeature(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    RoutingModule,
  ],
  exports: [ VIEW_COMPONENTS ],
  declarations: [ VIEW_COMPONENTS ],
})
export class ViewsModule { }
