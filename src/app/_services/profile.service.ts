import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Profile } from '../_models/index';
import { BaseService } from './base.service';

@Injectable()
export class ProfileService extends BaseService {

  constructor(private http: Http) {
    super();
  }

  private url = this.apiUrl + '/api/profiles/';

  getAll() {
    return this.http.get(this.url, this.options()).map((response: Response) => response.json());
  }

  get(userName: string) {
    return this.http.get(this.url + userName, this.options()).map((response: Response) => response.json());
  }

  update(profile: Profile) {
    return this.http.put(profile.url, profile, this.options()).map((response: Response) => response.json());
  }
}
