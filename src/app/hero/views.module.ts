import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { HeroState } from './hero.state';

import { RoutingModule } from './routing.module'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';


const VIEW_COMPONENTS = [
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
 ]

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      HeroState
    ]),
    RoutingModule,
  ],
  exports: [ VIEW_COMPONENTS ],
  declarations: [ VIEW_COMPONENTS ],
})
export class ViewsModule { }
