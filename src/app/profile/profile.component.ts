import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import decode from 'jwt-decode';
import { Roles } from '../_models/index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  roles: string[] = [];

  constructor() { }

  ngOnInit() {
    // TODO: move this to upper level (service, etc.)
    const token = localStorage.getItem('access_token');
    const tokenPayload = decode(token);
    this.roles = tokenPayload.roles.split(',') as Array<string>;
  }
}
