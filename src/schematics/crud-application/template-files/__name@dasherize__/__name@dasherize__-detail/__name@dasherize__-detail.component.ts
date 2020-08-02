import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { <%= classify(name) %>Action } from '../<%= dasherize(name) %>.actions';
import { <%= classify(name) %>State } from '../<%= dasherize(name) %>.state';

import { <%= classify(name) %> } from '../<%= dasherize(name) %>';

@Component({
  selector: 'app-<%= dasherize(name) %>-detail',
  templateUrl: './<%= dasherize(name) %>-detail.component.html',
  styleUrls: [ './<%= dasherize(name) %>-detail.component.css' ]
})
export class <%= classify(name) %>DetailComponent implements OnInit {
  /** ngxs Selector **/
  @Select(<%= classify(name) %>State.selected<%= classify(name) %>) <%= name %>$: Observable<<%= classify(name) %>>

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.get<%= classify(name) %>();
  }

  get<%= classify(name) %>(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new <%= classify(name) %>Action.Select(id));
  }

  goBack(): void {
    this.location.back();
  }

  save(<%= name %>: <%= classify(name) %>): void {
    this.store.dispatch(new <%= classify(name) %>Action.Update(<%= name %>))
      .subscribe(() => this.goBack());
  }
}
