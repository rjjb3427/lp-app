import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  UserComponent,
  userRoutes
} from './index';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    SimpleNotificationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserComponent
  ],
  providers: [
  ]
})
export class UserModule {
}
