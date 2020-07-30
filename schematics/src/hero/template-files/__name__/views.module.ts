import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { <%= classify(name) %>State } from './<%= name %>.state';

import { DashboardComponent } from './dashboard/dashboard.component';
import { <%= classify(name) %>DetailComponent } from './<%= name %>-detail/<%= name %>-detail.component';
import { <%= classify(namePlural) %>Component } from './<%= namePlural %>/<%= namePlural %>.component';
import { <%= classify(name) %>SearchComponent } from './<%= name %>-search/<%= name %>-search.component';
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
    NgxsModule.forFeature([
      <%= classify(name) %>State
    ]),
    HttpClientInMemoryWebApiModule.forFeature(
      InMemoryDataService, { dataEncapsulation: false }
    ),
  ],
  exports: [ VIEW_COMPONENTS ],
  declarations: [ VIEW_COMPONENTS ],
})
export class ViewsModule { }
