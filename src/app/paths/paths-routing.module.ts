import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {pathsRoutes} from './paths-routes';

@NgModule({
  imports: [
    RouterModule.forChild(pathsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class PathsRoutingModule {
}
