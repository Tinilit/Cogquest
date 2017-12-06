import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/auth.service';
import { NavigationComponent } from '../_directives/navigation/navigation.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})

export class PrivateComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
