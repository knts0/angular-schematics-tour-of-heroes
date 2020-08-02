import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, Select } from '@ngxs/store';
import { <%= classify(name) %>Action } from '../<%= name %>.actions';
import { <%= classify(name) %>State } from '../<%= name %>.state';

import { <%= classify(name) %> } from '../<%= name %>';

@Component({
  selector: 'app-<%= namePlural %>',
  templateUrl: './<%= namePlural %>.component.html',
  styleUrls: ['./<%= namePlural %>.component.css']
})
export class <%= classify(namePlural) %>Component implements OnInit {
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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.store.dispatch(new <%= classify(name) %>Action.Add({ name } as <%= classify(name) %>))
  }

  delete(<%= name %>: <%= classify(name) %>): void {
    this.store.dispatch(new <%= classify(name) %>Action.Delete(<%= name %>))
  }

}
