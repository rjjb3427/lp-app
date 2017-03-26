import {Routes} from '@angular/router';
import {
  PathDetailComponent,
  PathsComponent
} from './index';
import {AuthGuardService} from '../shared/auth-guard.service';

export const pathsRoutes: Routes = [
  {
    path: 'paths',
    canActivate: [AuthGuardService],
    component: PathsComponent
  },
  {
    path: 'paths/:id',
    component: PathDetailComponent,
    canActivate: [AuthGuardService]
  }
];
