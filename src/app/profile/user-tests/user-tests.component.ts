import { Component, OnInit } from '@angular/core';
import { ProviderUserTests } from './provider-user-tests.datasource';
import { ProviderUserTestsService, AuthenticationService } from '../../_services/index';
import { MatDialog } from '@angular/material';
import { CreateUserTestComponent } from './create-user-test/create-user-test.component';

@Component({
  selector: 'user-tests',
  templateUrl: './user-tests.component.html',
  styleUrls: ['../tests/tests.component.css']
})
export class UserTestsComponent implements OnInit {
  displayedColumns: string[] = ['testType', 'testName', 'userName', 'testDate'];
  dataSource: ProviderUserTests;

  constructor(private _providerUserTest: ProviderUserTestsService, private auth: AuthenticationService, private dialog: MatDialog) {
    this.dataSource = new ProviderUserTests(_providerUserTest, auth.CurrentUser.userId);
  }

  ngOnInit() {
  }

  createUserTests() {
    let dialogRef = this.dialog.open(CreateUserTestComponent, {
      width: '1200px',
      disableClose: true,
      // data: { test: "Foo" }
    });

    dialogRef.afterClosed().subscribe(data => {
      this.dataSource = new ProviderUserTests(this._providerUserTest, this.auth.CurrentUser.userId);
    });
  }

}
