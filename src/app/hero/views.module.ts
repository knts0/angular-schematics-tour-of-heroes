import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { NgxsModule } from '@ngxs/store';
import { HeroState } from './hero.state';

import { RoutingModule } from './routing.module'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';


const VIEW_COMPONENTS = [
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    MessagesComponent,
 ]

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      HeroState
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
