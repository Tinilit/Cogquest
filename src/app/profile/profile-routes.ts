import {Routes} from '@angular/router';
import {InfoComponent, TestsComponent, MyTestsComponent, UserTestsComponent} from './index';

export const ProfileRoutes: Routes = [
  {path: '', redirectTo: 'info', pathMatch: 'full'},
  {path: 'info', component: InfoComponent},
  {path: 'tests', component: MyTestsComponent},// TODO: this is must be test component 
  {path: 'my-tests', component: TestsComponent},// TODO: this is must be my-test component 
  {path: 'user-tests', component: UserTestsComponent},
];
