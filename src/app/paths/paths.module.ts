import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PathsRoutingModule} from './paths-routing.module';
import {MaterialModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2PaginationModule} from 'ng2-pagination';
import {PathsComponent, PathDetailComponent, AddPathComponent, PathsListComponent} from './index';
import {PathDataService} from "./shared/path-data.service";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    PathsRoutingModule
  ],
  declarations: [
    PathsComponent,
    PathDetailComponent,
    AddPathComponent,
    PathsListComponent
  ],
  providers: [
    PathDataService
  ]
})
export class PathsModule {
}
