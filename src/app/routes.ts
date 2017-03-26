import {Routes} from '@angular/router';
import {PathsComponent} from './paths/paths.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AuthGuardService} from './shared/auth-guard.service';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: 'courses', loadChildren: 'app/courses/course.module#CourseModule'
  },
  {
    path: 'paths', loadChildren: 'app/paths/paths.module#PathsModule'
  },
  {
    path: 'user', loadChildren: 'app/user/user.module#UserModule'
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
