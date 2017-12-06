import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseService {
  protected apiUrl = 'http://api.platform.com.ua';

  protected options() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = JSON.parse(localStorage.getItem('access_token'));
        if (token) {
          headers.append('Authorization', 'Bearer ' + token);
        }
        return new RequestOptions({ headers: headers });
    }
}
