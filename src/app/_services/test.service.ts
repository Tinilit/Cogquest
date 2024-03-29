import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Test } from '../_models/index';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  private url = this.apiUrl + '/api/tests/';

  getAll() {
    return this.http.get(this.url, this.options()).map((response: Response) => response.json());
  }

  get(id: string): Observable<Test> {
    return this.http.get(this.url + id, this.options()).map((response: Response) => response.json());
  }

  getByUrl(url: string): Observable<Test> {
    return this.http.get(url, this.options()).map((response: Response) => response.json());
  }

  update(test: Test) {
    return this.http.put(test.url, test, this.options()).map((response: Response) => response.json());
  }

  add(test: Test) {
    return this.http.post(this.url, test, this.options()).map((response: Response) => response.json());
  }

  delete(id) {
    return this.http.delete(this.url + id, this.options()).map((response: Response) => response.json());
  }
}
