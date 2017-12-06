import { AuthenticationService } from '../../_services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css'],
})

export class NavigationComponent {

  public constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  logout(): void {
    this.auth.logout();
  }
}
