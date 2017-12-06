import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserListItem } from '../_models/index';

@Injectable()
export class UsersService extends BaseService {

  usersUrl = this.apiUrl + "/api/users";

  constructor(private http: Http) {
    super();
  }

  get(): Observable<UserListItem[]> {
    return this.http.get(this.usersUrl, this.options()).map((response: Response) => response.json());
  }
}
