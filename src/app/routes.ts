import {Routes} from '@angular/router';
import {PathComponent} from './path/path.component';
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
    path: 'paths',
    canActivate: [AuthGuardService],
    component: PathComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
  {
    path: 'courses', loadChildren: 'app/courses/course.module#CourseModule'
  },
  {
    path: 'user', loadChildren: 'app/user/user.module#UserModule'
  }
];
