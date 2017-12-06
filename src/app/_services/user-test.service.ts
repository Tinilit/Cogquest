import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Test, UserTest } from '../_models/index';
import { BaseService } from './base.service';

@Injectable()
export class UserTestService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  private url = this.apiUrl + '/api/usertests/';

  getAll() {
    return this.http.get(this.url, this.options()).map((response: Response) => response.json());
  }

  get(id: string) {
    return this.http.get(this.url + id, this.options()).map((response: Response) => response.json());
  }

  update(test: Test) {
    return this.http.put(test.url, test, this.options()).map((response: Response) => response.json());
  }

  add(test: UserTest) {
    return this.http.post(this.url, test, this.options()).map((response: Response) => response.json());
  }

  delete(id) {
    return this.http.delete(this.url + id, this.options()).map((response: Response) => response.json());
  }
}
