import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { <%= classify(name) %> } from './<%= name %>';
import { <%= classify(name) %>Action } from './<%= name %>.actions';
import { <%= classify(name) %>Service } from './<%= name %>.service';
import { Injectable } from '@angular/core';

export class <%= classify(name) %>StateModel {
  selected<%= classify(name) %>: <%= classify(name) %>;
  <%= camelize(namePlural) %>: <%= classify(name) %>[];
}

@State<<%= classify(name) %>StateModel>({
  name: '<%= namePlural %>',
  defaults: {
    selected<%= classify(name) %>: null,
    <%= camelize(namePlural) %>: []
  }
})

@Injectable()
export class <%= classify(name) %>State {

  constructor(
    private <%= camelize(name) %>Service: <%= classify(name) %>Service
  ) { }

  //////// Selector //////////
  @Selector()
  static <%= camelize(namePlural) %>(state: <%= classify(name) %>StateModel) {
    return state.<%= camelize(namePlural) %>;
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
           <%= camelize(namePlural) %>: data
         });
        }),
      )
  }

  @Action(<%= classify(name) %>Action.Select)
  select(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Select) {
    const id = action.id;
    return this.<%= camelize(name) %>Service.get<%= classify(name) %>(id)
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
    const <%= camelize(name) %> = action.payload;

    return this.<%= camelize(name) %>Service.add<%= classify(name) %>(<%= camelize(name) %>).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      })
    );
  }

  @Action(<%= classify(name) %>Action.Delete)
  delete<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Delete) {
    const <%= camelize(name) %> = action.payload;
    const id = typeof <%= camelize(name) %> === 'number' ? <%= camelize(name) %> : <%= camelize(name) %>.id;

    return this.<%= camelize(name) %>Service.delete<%= classify(name) %>(id).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      }),
    );
  }

  @Action(<%= classify(name) %>Action.Update)
  update<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Update): Observable<any> {
    const <%= camelize(name) %> = action.payload;

    return this.<%= name %>Service.update<%= classify(name) %>(<%= camelize(name) %>);
  }
}
