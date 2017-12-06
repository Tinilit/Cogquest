import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService extends BaseService {
  constructor(private http: Http) {
    super();
  }

  register(username: string, password: string, password2: string) {
    return this.http.post(this.apiUrl + '/api/auth/register', JSON.stringify({
      username: username, password: password, password2: password2
    }), this.options())
      .map((response: Response) => {
        const message = response.json();
        if (message && message.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', JSON.stringify(message));
          return true;
        }
        return false;
      });
  }

  login(username: string, password: string) {
    return this.http.post(this.apiUrl + '/api/auth/token', JSON.stringify({
      UserName: username, Password: password
    }), this.options())
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const message = response.json();
        if (message && message.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('access_token', JSON.stringify(message.token));
          localStorage.setItem("authorization_info", JSON.stringify({ userName: message.userName, userId: message.userId }));
          return true;
        }

        return false;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    localStorage.removeItem('authorization_info');
  }

  get CurrentUser(): User {
    return JSON.parse(localStorage.getItem("authorization_info")) as User;
  }

  get IsAuthenticated() {
    return localStorage.getItem("access_token") !== null;
  }

}
