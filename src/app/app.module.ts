import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Ng2BootstrapModule} from 'ng2-bootstrap';
import {LayoutComponent} from './layout/layout.component';
import {AuthService} from './user/shared/auth.service';
import {PathComponent} from './path/path.component';
import {CourseDataService} from './courses/shared/course-data.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserModule} from './user/user.module';
import {CourseModule} from './courses/course.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuardService} from './shared/auth-guard.service';
import {MaterialModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    PageNotFoundComponent,
    PathComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    Ng2BootstrapModule,
    FileUploadModule,
    CourseModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    CourseDataService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
