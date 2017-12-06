// vendor
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideModule } from 'ng-click-outside';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
         MatNativeDateModule,
         MatRadioModule,
         MatDatepickerModule,
         MatTableModule, 
         MatListModule} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';




import { PageSliderModule } from 'ng2-page-slider';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

// common
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './_directives/navigation/navigation.component';
import { AuthGuard, RolesGuard } from './_guards/index';
import { DeleteDialogComponent } from './_directives/dialogs/index';

// services
import { AuthenticationService, ProfileService, TestService, ProviderUserTestsService, UsersService } from './_services/index';
import { TestTypeService } from './_services/testtype.service';
import { UserTestService } from './_services/user-test.service';

// pages
import { PublicComponent, PrivateComponent } from './_layouts/index';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent, SlideshowComponent } from './home/index';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent, InfoComponent, TestsComponent } from './profile/index';
import { TowerOfLondonComponent } from './tower-of-london/tower-of-london.component';
import { CreateTowerOfLondonComponent } from './create-tower-of-london/create-tower-of-london.componetn';
import { UserTestsComponent } from './profile/user-tests/user-tests.component';
import { CreateUserTestComponent } from './profile/user-tests/create-user-test/create-user-test.component'
import { MyTestsComponent } from './profile/my-tests/my-tests.component';


@NgModule({
  declarations: [
    AppComponent,
    PrivateComponent,
    PublicComponent,
    NavigationComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    SlideshowComponent,
    RegisterComponent,
    ProfileComponent,
    InfoComponent,
    TestsComponent,
    DeleteDialogComponent,
    TowerOfLondonComponent,
    CreateTowerOfLondonComponent,
    MyTestsComponent,
    UserTestsComponent,
    CreateUserTestComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    CreateUserTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatStepperModule,
    BrowserAnimationsModule,
    CdkTableModule,
    ClickOutsideModule,
    HttpModule,
    PageSliderModule,
    Ng2PageScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    ProfileService,
    TestService,
    TestTypeService,
    UserTestService,
    ProviderUserTestsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
