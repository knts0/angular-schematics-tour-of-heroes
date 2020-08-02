import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { <%= classify(namePlural) %>Component } from './<%= namePlural %>/<%= namePlural %>.component';
import { <%= classify(name) %>DetailComponent } from './<%= name %>-detail/<%= name %>-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: <%= classify(name) %>DetailComponent },
  { path: '<%= namePlural %>', component: <%= classify(namePlural) %>Component }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
