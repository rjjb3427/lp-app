import {Routes} from "@angular/router";
import {
  CourseDetailComponent,
  CoursesComponent,
  AuthGuardService
} from "./index";
import {CourseDetailResolverService} from "./course-detail/course-detail-resolver.service";

export const coursesRoutes: Routes = [
  {
    path: 'courses',
    canActivate: [AuthGuardService],
    component: CoursesComponent
  },
  {
    path: 'courses/:id',
    component: CourseDetailComponent,
    canActivate: [AuthGuardService],
    resolve: {
      courses: CourseDetailResolverService
    }
  }
];
