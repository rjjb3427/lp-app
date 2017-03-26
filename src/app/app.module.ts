import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';

import {AppComponent} from './app.component';
import {Ng2BootstrapModule} from 'ng2-bootstrap';
import {LayoutComponent} from './layout/layout.component';
import {AuthService} from './user/shared/auth.service';
import {CourseDataService} from './courses/shared/course-data.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {UserModule} from './user/user.module';
import {CourseModule} from './courses/course.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuardService} from './shared/auth-guard.service';
import {LpToastsService} from './shared/lp-toasts.service';
import {UploadService} from './shared/upload.service';
import { PathsComponent } from './paths/paths.component';
import { PathsListComponent } from './paths/paths-list/paths-list.component';
import { PathDetailComponent } from './paths/path-detail/path-detail.component';
import { AddPathComponent } from './paths/add-path/add-path.component';
import {PathsModule} from "./paths/paths.module";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    Ng2BootstrapModule,
    FileUploadModule,
    SimpleNotificationsModule.forRoot(),
    CourseModule,
    PathsModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    CourseDataService,
    AuthService,
    AuthGuardService,
    NotificationsService,
    LpToastsService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
