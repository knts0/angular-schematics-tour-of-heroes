import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { <%= classify(name) %> } from './<%= name %>';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class <%= classify(name) %>Service {

  private <%= namePlural %>Url = 'api/<%= name %>';  // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  get<%= classify(namePlural) %>(): Observable<<%= classify(name) %>[]> {
    return this.http.get<<%= classify(name) %>[]>(this.apiUrl)
      .pipe(
        tap(response => this.log('fetched')),
        catchError(this.handleError('getAll', []))
      );
  }

  get<%= classify(name) %>(id: number): Observable<<%= classify(name) %>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<<%= classify(name) %>>(url).pipe(
      tap(_ => this.log(`fetched <%= name %> id=${id}`)),
      catchError(this.handleError<<%= classify(name) %>>(`get id=${id}`))
    );
  }

  search<%= classify(namePlural) %>(term: string): Observable<<%= classify(name) %>[]> {
    if (!term.trim()) {
      // 検索語がない場合、空の配列を返す
      return of([]);
    }
    return this.http.get<<%= classify(name) %>[]>(`${this.apiUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found matching "${term}"`)),
      catchError(this.handleError<<%= classify(name) %>[]>('search', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  add<%= classify(name) %>(payload: <%= classify(name) %>): Observable<<%= classify(name) %>> {
    return this.http.post<<%= classify(name) %>>(this.apiUrl, payload, httpOptions).pipe(
      tap((new: <%= classify(name) %>) => this.log(`added w/ id=${payload.id}`)),
      catchError(this.handleError<<%= classify(name) %>>('add'))
    );
  }

  delete<%= classify(name) %>(id: number): Observable<<%= classify(name) %>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<<%= classify(name) %>>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted id=${id}`)),
      catchError(this.handleError<<%= classify(name) %>>('delete'))
    );
  }

  update<%= classify(name) %>(payload: <%= classify(name) %>): Observable<any> {
    return this.http.put(this.apiUrl, payload, httpOptions).pipe(
      tap(_ => this.log(`updated id=${payload.id}`)),
      catchError(this.handleError<any>('update'))
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
