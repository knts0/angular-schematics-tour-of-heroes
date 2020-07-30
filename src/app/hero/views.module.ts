import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { HeroState } from './hero.state';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';


const VIEW_COMPONENTS = [
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    MessagesComponent,
 ]

@NgModule({
  imports: [
    NgxsModule.forFeature([
      HeroState
    ]),
    NgxsLoggerPluginModule.forRoot(),
  ],
  exports: VIEW_COMPONENTS,
  declarations: VIEW_COMPONENTS,
})
export class ViewsModule { }
