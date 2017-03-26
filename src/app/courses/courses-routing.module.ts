import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {coursesRoutes} from './courses.routes';
import {CourseDetailResolverService} from './course-detail/course-detail-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild(coursesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CourseDetailResolverService
  ]
})
export class CourseRoutingModule {
}
