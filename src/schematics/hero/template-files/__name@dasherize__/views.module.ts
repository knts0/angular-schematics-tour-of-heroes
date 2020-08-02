import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { NgxsModule } from '@ngxs/store';
import { <%= classify(name) %>State } from './<%= dasherize(name) %>.state';

import { RoutingModule } from './routing.module'
import { <%= classify(name) %>DetailComponent } from './<%= dasherize(name) %>-detail/<%= dasherize(name) %>-detail.component';
import { <%= classify(namePlural) %>Component } from './<%= dasherize(namePlural) %>/<%= dasherize(namePlural) %>.component';
import { <%= classify(name) %>SearchComponent } from './<%= dasherize(name) %>-search/<%= dasherize(name) %>-search.component';


const VIEW_COMPONENTS = [
    <%= classify(name) %>DetailComponent,
    <%= classify(namePlural) %>Component,
    <%= classify(name) %>SearchComponent,
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
