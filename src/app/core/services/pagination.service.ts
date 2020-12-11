import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class PaginationService<T> {
  constructor(private _http: HttpClient, private endpoint: string) {}

  public readAll(skip?: number, limit?: number): Observable<T> {
    skip = skip == undefined ? 0 : skip;
    limit = limit == undefined ? 1 : limit;

    return this._http.get<T>(
      `${this.endpoint}/?children=false&limit=${limit}&skip=${skip}`
    );
  }
}
