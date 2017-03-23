import {Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardService} from '../shared/auth-guard.service';
import {UserComponent} from './user.component';

export const userRoutes: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuardService],
    component: ProfileComponent
  },
  {
    path: 'login',
    component: UserComponent
  }
];
