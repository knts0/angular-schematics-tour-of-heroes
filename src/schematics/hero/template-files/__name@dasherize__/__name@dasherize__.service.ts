import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { <%= classify(name) %> } from './<%= dasherize(name) %>';
import { MessageService } from '../message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>Service {

  private <%= namePlural %>Url = 'api/<%= dasherize(namePlural) %>';  // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  get<%= classify(namePlural) %>(): Observable<<%= classify(name) %>[]> {
    return this.http.get<<%= classify(name) %>[]>(this.<%= namePlural %>Url)
      .pipe(
        tap(<%= namePlural %> => this.log('fetched <%= namePlural %>')),
        catchError(this.handleError('get<%= classify(namePlural) %>', []))
      );
  }

  get<%= classify(name) %>(id: number): Observable<<%= classify(name) %>> {
    const url = `${this.<%= namePlural %>Url}/${id}`;
    return this.http.get<<%= classify(name) %>>(url).pipe(
      tap(_ => this.log(`fetched <%= name %> id=${id}`)),
      catchError(this.handleError<<%= classify(name) %>>(`get<%= classify(name) %> id=${id}`))
    );
  }

  search<%= classify(namePlural) %>(term: string): Observable<<%= classify(name) %>[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の配列を返す
      return of([]);
    }
    return this.http.get<<%= classify(name) %>[]>(`${this.<%= namePlural %>Url}/?name=${term}`).pipe(
      tap(_ => this.log(`found <%= namePlural %> matching "${term}"`)),
      catchError(this.handleError<<%= classify(name) %>[]>('search<%= classify(namePlural) %>', []))
    );
  }

  //////// Save methods //////////

  add<%= classify(name) %>(<%= name %>: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.http.post<<%= classify(name) %>>(this.<%= namePlural %>Url, <%= name %>, httpOptions).pipe(
      tap((new<%= classify(name) %>: <%= classify(name) %>) => this.log(`added <%= name %> w/ id=${new<%= classify(name) %>.id}`)),
      catchError(this.handleError<<%= classify(name) %>>('add<%= classify(name) %>'))
    );
  }

  delete<%= classify(name) %>(id: number): Observable<<%= classify(name) %>> {
    const url = `${this.<%= namePlural %>Url}/${id}`;

    return this.http.delete<<%= classify(name) %>>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted <%= name %> id=${id}`)),
      catchError(this.handleError<<%= classify(name) %>>('delete<%= classify(name) %>'))
    );
  }

  update<%= classify(name) %>(<%= name %>: <%= classify(name) %>): Observable<any> {
    return this.http.put(this.<%= namePlural %>Url, <%= name %>, httpOptions).pipe(
      tap(_ => this.log(`updated <%= name %> id=${<%= name %>.id}`)),
      catchError(this.handleError<any>('update<%= classify(name) %>'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** <%= classify(name) %>ServiceのメッセージをMessageServiceを使って記録 */
  log(message: string) {
    this.messageService.add(`<%= classify(name) %>Service: ${message}`);
  }
}
