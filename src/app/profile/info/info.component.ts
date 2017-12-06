import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ProfileService, AuthenticationService } from '../../_services/index';
import { Profile } from '../../_models/index';

@Component({
  selector: 'info',
  templateUrl: 'info.component.html',
  styleUrls: ['info.component.css'],
})

export class InfoComponent implements OnInit {
  profile: Profile;
  submited = false;

  public constructor(
    private router: Router,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    let name = this.auth.CurrentUser.userName;
    this.profileService.get(name).subscribe(profile => {
      this.profile = profile;
    });
  }

  save(): void {
    this.profileService.update(this.profile).subscribe(profile => {
      this.profile = profile;
      this.snackbar.open('Saved!', null, {
        duration: 1000
      });
    }, error => {
      this.snackbar.open('Error!', null, {
        duration: 1000
      });
      console.log(error);
    });
  }
}
