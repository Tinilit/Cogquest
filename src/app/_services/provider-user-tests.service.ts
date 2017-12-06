import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Http, Response } from '@angular/http';
import { UserTest } from '../_models/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProviderUserTestsService extends BaseService {
  private url = this.apiUrl + '/api/profile-user-tests/';

  constructor(private http: Http) {
    super();
  }

  getAll(profileId: string): Observable<UserTest[]> {
    console.log("start");
    
    return this.http.get(this.url + profileId, this.options()).map((response: Response) => {
      return response.json() as UserTest[];
    });
  }
}
