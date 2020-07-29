import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { <%= classify(name) %> } from '../<%= name %>';
import { <%= classify(name) %>Service } from '../<%= name %>.service';

@Component({
  selector: 'app-<%= name %>-search',
  templateUrl: './<%= name %>-search.component.html',
  styleUrls: [ './<%= name %>-search.component.css' ]
})
export class <%= classify(name) %>SearchComponent implements OnInit {
  <%= camelize(namePlural) %>$: Observable<<%= classify(name) %>[]>;
  private searchTerms = new Subject<string>();

  constructor(private <%= camelize(name) %>Service: <%= classify(name) %>Service) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.<%= camelize(namePlural) %>$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.<%= camelize(name) %>Service.search<%= classify(namePlural) %>(term)),
    );
  }
}
