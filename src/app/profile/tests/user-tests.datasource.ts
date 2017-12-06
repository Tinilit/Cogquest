import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatDialog } from '@angular/material';
import { UserTestService } from '../../_services/index';
import { UserTest } from '../../_models/index';

import 'rxjs/add/operator/switchMap';

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class UserTestDataSource extends DataSource<any> {
  constructor(private _userTestService: UserTestService, private _sort: MatSort) {
    super();
  }
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserTest[]> {
    const displayDataChanges = [
      this._sort.sortChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges)
    .switchMap(() => this.getSortedData());
  }

  disconnect() { }

  getSortedData(): Observable<UserTest[]> {
    return this._userTestService.getAll().map(userTests => {
      let data = userTests.slice().filter((item: UserTest) => {
        let searchStr = this.generateSearchString(item);
        searchStr = searchStr.toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
      if (!this._sort.active || this._sort.direction === '') {
        data = data;
      } else {
        data = data.sort((a, b) => {
          const propertyA = a[this._sort.active];
          const propertyB = b[this._sort.active];

          let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
          let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

          return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
      }
      return data;
    });
  }

  generateSearchString(item: any) {
    let searchString = '';
    for (const property in item) {
      if (item.hasOwnProperty(property)) {
        if (typeof item[property] === 'object') {
          searchString += this.generateSearchString(item[property]);
        }
        searchString = searchString + item[property];
      }
    }
    return searchString;
  }
}
