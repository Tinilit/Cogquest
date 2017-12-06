import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MyTestsDatasource } from '../../my-tests/my-test.datasource';
import { TestService, AuthenticationService, ProfileService, UserTestService } from '../../../_services/index';
import { Test, Profile, UserTest, UserListItem } from '../../../_models/index';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'create-user-test',
  templateUrl: './create-user-test.component.html',
  styleUrls: ['./create-user-test.component.css']
})
export class CreateUserTestComponent implements OnInit {

  // @Inject(MAT_DIALOG_DATA) public data: any

  tests: Test[] = [];
  users: UserListItem[] = [];

  selectedTest: Test = null;
  selectedUser: UserListItem = null;

  constructor(
    private _dialogRef: MatDialogRef<CreateUserTestComponent>,
    private _testService: TestService,
    private _profileService: ProfileService,
    private _authService: AuthenticationService,
    private _userTestService: UserTestService,
    private _userService: UsersService
  ) { }

  ngOnInit() {
    this.loadTests();
    this.loadUsers();
  }

  save() {
    let urlParts = this.selectedTest.url.split('/');
    let userTest: UserTest = {
      url: this.selectedTest.url,
      userId: this.selectedUser.userId,
      testId: +urlParts[urlParts.length - 1]
    } as UserTest;

    this._userTestService.add(userTest)
      .subscribe(() => {
        this._dialogRef.close("Saved");
      });
  }

  cancel() {
    this._dialogRef.close("Closed");
  }

  private loadUsers() {
    this._userService.get()
      .subscribe((users: UserListItem[]) => {
        this.users = users;
      });
  }

  private loadTests() {
    this._testService.getAll()
      .subscribe((tests: Test[]) => {
        console.log(tests);
        let id = this._authService.CurrentUser.userId;
        this.tests = tests.filter(test => test.providerId === id);
      });
  }
}
