import {Component, OnInit} from '@angular/core';
import {PathDataService} from '../shared/path-data.service';
import {IPath} from '../shared/path.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {LpToastsService} from '../../shared/lp-toasts.service';

@Component({
  selector: 'lp-path-detail',
  templateUrl: './path-detail.component.html',
  styleUrls: ['./path-detail.component.scss']
})
export class PathDetailComponent implements OnInit {
  path: IPath;
  toastOptions;

  constructor(private dataService: PathDataService,
              private route: ActivatedRoute,
              private router: Router,
              private toastService: LpToastsService) {
    this.toastOptions = this.toastService.toastOptions;
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getPath(params['id']))
      .subscribe(
        (path: IPath) => this.path = path,
        error => this.router.navigate(['/paths'])
      );
  }

  onSelect(id) {
    this.router.navigate(['/courses', id]);
  }

  removeCourse(course) {
    this.path._courses.splice(this.path._courses.indexOf(course), 1);
    this.dataService.removeCourseFromPath(course, this.path._id).subscribe(
      data => {
        console.log(data)
        return this.flashMessage('success', 'Course removed from Path')
      },
      error => {
        console.log(error)
        return this.flashMessage('error', 'Something went wrong!')
      }
    );
  }

  flashMessage(type, message) {
    this.toastService.flash(type, message);
  }

  backToPathList() {
    this.router.navigate(['/paths']);
  }

}
