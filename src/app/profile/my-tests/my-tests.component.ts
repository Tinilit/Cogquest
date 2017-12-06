import { Component, OnInit } from '@angular/core';
import { UserTestService, AuthenticationService, TestService } from '../../_services/index';
import { MyTestsDatasource } from './my-test.datasource';
import { Router } from '@angular/router';

@Component({
  selector: 'my-tests',
  templateUrl: './my-tests.component.html',
  styleUrls: ['../tests/tests.component.css']
})
export class MyTestsComponent implements OnInit {
  displayedColumns = ['testType', 'testName', 'testDate'];
  dataSource: MyTestsDatasource;

  constructor(private _testService: TestService, private _authService: AuthenticationService, private router: Router) {
    this.dataSource = new MyTestsDatasource(_testService, _authService.CurrentUser.userId);
  }

  ngOnInit() {
  }

  update(url: string) {
    //TODO: get id from Url and redirect to /create-tower-of-london
    this.router.navigate(["/create-tower-of-london"], {
      queryParams: {
        url: url
      }
    });
  }

}
