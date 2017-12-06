import { Component, OnInit } from '@angular/core';
import { Ctol } from './ctol/create-tower-of-london-min';
import { TestService, TestTypeService } from '../_services/index';
import { Test, Profile, TestType } from '../_models/index';
import { CtolForm } from '../_models/ctolForm';
// import { forEach } from '@angular/router/src/utils/collection';
/* import { error } from 'util'; */
import { ProfileService, AuthenticationService } from '../_services/index';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-tower-of-london',
  templateUrl: 'create-tower-of-london.component.html',
  styleUrls: ['create-tower-of-london.component.css']
})
export class CreateTowerOfLondonComponent implements OnInit {
  private formTest: CtolForm;
  private test: Test;
  private testType: TestType;
  private testSplit: object;
  private profile: Profile;
  private testUrl: string;

  public constructor(
    private testService: TestService,
    private profileService: ProfileService,
    private testTypeService: TestTypeService,
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.testUrl = null;
    this.formTest = {
      testName: '',
      beginingText: '',
      feedbackText: '',
      overMoveFeedback: '',
      overTimeFeedback: '',
      onEnd: '',
      finishButtonText: '',
      workAreaLabel: '',
      goalAreaText: '',
      practiceRounds: '',
      numOfTestRounds: 0,
      CalculateFrom: 0,
      TimeOutAfter: 0,
      MaxMoves: 0,
      Countdowntime: 0,
      CountdownText: '',
      ShowFeedback: false,
      displayResultPage: false
    }

    this.route.queryParams.subscribe(params => {
      let url = params['url'];
      if (url) {
        this.testService.getByUrl(url).subscribe(data => {
          this.testUrl = data.url;
          this.test = data;
          this.testSplit = this.test.data.split('//||//||//');
          this.testSplit[0] = JSON.parse(this.testSplit[0]); // moves data
          this.testSplit[1] = JSON.parse(this.testSplit[1]); // form data
          this.formTest = this.testSplit[1];
        });
      }
    });

    this.profileService.get(this.authenticationService.CurrentUser.userName).subscribe(profile => {
      this.profile = profile;
    });

    this.testTypeService.get('1').subscribe(testType => {
      this.testType = testType;
    });
  }

  runScript(): void {
    if (this.testUrl != null) {
      Ctol.initFunction(this.testSplit[0]);
    }
    else {
      Ctol.initFunction('');
    }

  }

  save(): void {
    const movesArr = Ctol.getMoves();
    if (this.testUrl != null) {
      this.test = {
        url: this.testUrl,
        name: this.formTest.testName,
        providerId: this.authenticationService.CurrentUser.userId,
        providerProfile: this.profile,
        testType: this.testType,
        testTypeId: 1,
        data: JSON.stringify(movesArr) + '//||//||//' + JSON.stringify(this.formTest)
      };
      this.testService.update(this.test).subscribe(
        test => {
          this.snackbar.open('Saved!', null, {
            duration: 1000
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.test = {
        url: null,
        name: this.formTest.testName,
        providerId: this.authenticationService.CurrentUser.userId,
        providerProfile: this.profile,
        testType: this.testType,
        testTypeId: 1,
        data: JSON.stringify(movesArr) + '//||//||//' + JSON.stringify(this.formTest)
      };
      this.testService.add(this.test).subscribe(
        test => {
          this.snackbar.open('Saved!', null, {
            duration: 1000
          });
        },
        error => {
          console.log(error);
        }
      );
    }

  }
}
