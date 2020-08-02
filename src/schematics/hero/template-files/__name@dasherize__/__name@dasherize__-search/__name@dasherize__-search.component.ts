import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { <%= classify(name) %> } from '../<%= dasherize(name) %>';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-search',
  templateUrl: './<%= dasherize(name) %>-search.component.html',
  styleUrls: [ './<%= dasherize(name) %>-search.component.css' ]
})
export class <%= classify(name) %>SearchComponent implements OnInit {
  <%= namePlural %>$: Observable<<%= classify(name) %>[]>;
  private searchTerms = new Subject<string>();

  constructor(private <%= name %>Service: <%= classify(name) %>Service) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.<%= namePlural %>$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.<%= name %>Service.search<%= classify(namePlural) %>(term)),
    );
  }
}
