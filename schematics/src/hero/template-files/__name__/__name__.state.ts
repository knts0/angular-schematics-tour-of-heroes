import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

import { State, Action, StateContext, Selector } from '@ngxs/store';

import { <%= classify(name) %> } from './<%= name %>';
import { <%= classify(name) %>Action } from './<%= name %>.actions';
import { <%= classify(name) %>Service } from './<%= name %>.service';

export class <%= classify(name) %>StateModel {
  selected: <%= classify(name) %>;
  elements: <%= classify(name) %>[];
}

@State<<%= classify(name) %>StateModel>({
  name: '<%= name %>',
  defaults: {
    selected: null,
    elements: []
  }
})

export class <%= classify(name) %>State {

  constructor(
    private <%= name %>Service: <%= classify(name) %>Service
  ) { }

  //////// Selector //////////
  /** ヒーロー一覧 **/
  @Selector()
  static elements(state: <%= classify(name) %>StateModel) {
    return state.elements;
  }

  /** 選択中のヒーロー **/
  @Selector()
  static selected<%= classify(name) %>(state: <%= classify(name) %>StateModel) {
    return state.selected;
  }

  //////// Load methods //////////
  /** サーバーからヒーローを取得する */
  @Action(<%= classify(name) %>Action.Load)
  load(ctx: StateContext<<%= classify(name) %>StateModel>) {
    return this.<%= name %>Service.get<%= classify(namePlural) %>()
      .pipe(
        tap((data) => {
         ctx.patchState({
           elements: data
         });
        }),
      )
  }

  /** IDによりヒーローを選択する。*/
  @Action(<%= classify(name) %>Action.Select)
  select(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Select) {
    const id = action.id;
    return this.<%= name %>Service.get<%= classify(name) %>(id)
      .pipe(
        tap((data: <%= classify(name) %>) => {
         ctx.patchState({
           selected: data
         });
        }),
      )
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  @Action(<%= classify(name) %>Action.Add)
  add(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Add) {
    const data = action.payload;

    return this.<%= name %>Service.add<%= classify(name) %>(data).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      })
    );
  }

  /** DELETE: サーバーからヒーローを削除 */
  @Action(<%= classify(name) %>Action.Delete)
  delete(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Delete) {
    const data = action.payload;
    const id = typeof data === 'number' ? data : data.id;

    return this.<%= name %>Service.delete<%= classify(name) %>(id).pipe(
      finalize(() => {
        ctx.dispatch(new <%= classify(name) %>Action.Load());
      }),
    );
  }

  /** PUT: サーバー上でヒーローを更新 */
  @Action(<%= classify(name) %>Action.Update)
  update<%= classify(name) %>(ctx: StateContext<<%= classify(name) %>StateModel>, action: <%= classify(name) %>Action.Update): Observable<any> {
    const data = action.payload;

    return this.<%= name %>Service.update<%= classify(name) %>(data);
  }
}
