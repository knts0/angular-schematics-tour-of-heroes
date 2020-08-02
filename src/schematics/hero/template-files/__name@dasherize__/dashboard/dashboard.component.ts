import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { <%= classify(name) %>Action } from '../<%= dasherize(name) %>.actions';
import { <%= classify(name) %>State } from '../<%= dasherize(name) %>.state';

import { <%= classify(name) %> } from '../<%= dasherize(name) %>';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  /** ngxs Selector **/
  @Select(<%= classify(name) %>State.<%= namePlural %>) <%= namePlural %>$: Observable<<%= classify(name) %>[]>

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.get<%= classify(namePlural) %>();
  }

  get<%= classify(namePlural) %>(): void {
    this.store.dispatch(new <%= classify(name) %>Action.Load())
  }
}
