import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { <%= classify(name) %>Action } from '../<%= name %>.actions';
import { <%= classify(name) %>State } from '../<%= name %>.state';

import { <%= classify(name) %> } from '../<%= name %>';

@Component({
  selector: 'app-<%= name %>-detail',
  templateUrl: './<%= name %>-detail.component.html',
  styleUrls: [ './<%= name %>-detail.component.css' ]
})
export class <%= classify(name) %>DetailComponent implements OnInit {
  /** ngxs Selector **/
  @Select(<%= classify(name) %>State.selected<%= classify(name) %>) <%= camelize(name) %>$: Observable<<%= classify(name) %>>

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

  save(<%= camelize(name) %>: <%= classify(name) %>): void {
    this.store.dispatch(new <%= classify(name) %>Action.Update(<%= camelize(name) %>))
      .subscribe(() => this.goBack());
  }
}
