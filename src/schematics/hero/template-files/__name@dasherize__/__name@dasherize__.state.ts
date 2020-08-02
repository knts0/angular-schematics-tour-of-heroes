import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { <%= classify(name) %> } from './<%= name %>';
import { <%= classify(name) %>Action } from './<%= name %>.actions';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { Injectable } from '@angular/core';

export class <%= classify(name) %>StateModel {
  selected<%= classify(name) %>: <%= classify(name) %>;
  <%= namePlural %>: <%= classify(name) %>[];
}

@State<<%= classify(name) %>StateModel>({
  name: '<%= namePlural %>',
  defaults: {
    selected<%= classify(name) %>: null,
    <%= namePlural %>: []
  }
})

@Injectable()
export class <%= classify(name) %>State {

  constructor(
    private <%= name %>Service: <%= classify(name) %>Service
  ) { }

  //////// Selector //////////
  @Selector()
  static <%= namePlural %>(state: <%= classify(name) %>StateModel) {
    return state.<%= namePlural %>;
  }

  @Selector()
  static selected<%= classify(name) %>(state: <%= classify(name) %>StateModel) {
    return state.selected<%= classify(name) %>;
  }

  //////// Load methods //////////
  @Action(<%= classify(name) %>Action.Load)
  load(ctx: StateContext<<%= classify(name) %>StateModel>) {
    return this.<%= name %>Service.get<%= classify(namePlural) %>()
      .pipe(
        tap((data) => {
         ctx.patchState({
           <%= namePlural %>: data
         });
        }),
      )
  }

  @Action(<%= classify(name) %>Action.Select)
  select(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Select) {
    const id = action.id;
    return this.<%= name %>Service.get<%= classify(name) %>(id)
      .pipe(
        tap((data: <%= classify(name) %>) => {
         ctx.patchState({
           selected<%= classify(name) %>: data
         });
        }),
      )
  }

  //////// Save methods //////////

  @Action(<%= classify(name) %>Action.Add)
  add<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Add) {
    const <%= name %> = action.payload;

    return this.<%= name %>Service.add<%= classify(name) %>(<%= name %>).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      })
    );
  }

  @Action(<%= classify(name) %>Action.Delete)
  delete<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Delete) {
    const <%= name %> = action.payload;
    const id = typeof <%= name %> === 'number' ? <%= name %> : <%= name %>.id;

    return this.<%= name %>Service.delete<%= classify(name) %>(id).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      }),
    );
  }

  @Action(<%= classify(name) %>Action.Update)
  update<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Update): Observable<any> {
    const <%= name %> = action.payload;

    return this.<%= name %>Service.update<%= classify(name) %>(<%= name %>);
  }
}
