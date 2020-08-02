import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { <%= classify(namePlural) %>Component } from './<%= dasherize(namePlural) %>/<%= dasherize(namePlural) %>.component';
import { <%= classify(name) %>DetailComponent } from './<%= dasherize(name) %>-detail/<%= dasherize(name) %>-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: <%= classify(name) %>DetailComponent },
  { path: '<%= dasherize(namePlural) %>', component: <%= classify(namePlural) %>Component }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
