import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';

import {
  CourseDetailComponent,
  CoursesComponent,
  CourseListComponent,
  AddCourseComponent
} from './index';
import {Ng2PaginationModule} from 'ng2-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseRoutingModule} from './courses-routing.module';
import {FileUploadModule} from 'ng2-file-upload';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    FileUploadModule,
    SimpleNotificationsModule,
    CourseRoutingModule
  ],
  declarations: [
    CoursesComponent,
    CourseListComponent,
    AddCourseComponent,
    CourseDetailComponent
  ],
  providers: []
})
export class CourseModule {
}
