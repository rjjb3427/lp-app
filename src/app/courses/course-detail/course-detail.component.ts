import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {ICourse} from '../shared/course.model';
import {PathDataService} from '../../paths/shared/path-data.service';
import {IPath} from '../../paths/shared/path.model';
import {LpToastsService} from "../../shared/lp-toasts.service";

@Component({
  selector: 'lp-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: ICourse;
  paths: IPath;
  public toastOptions;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pathData: PathDataService,
              private toastService: LpToastsService) {
    this.toastOptions = this.toastService.toastOptions;
  }

  ngOnInit() {
    // get the course from resolver
    this.route.data
      .subscribe((data: { courses }) => this.course = data.courses);

    this.pathData.getPaths().subscribe(paths => this.paths = paths);
  }

  addToPath(id) {
    this.pathData.addCourseToPath(this.course, id).subscribe(
      data => {
        console.log(data)
        return this.flashMessage('success', 'Course Added to Path');
      },
        error => console.log(error)
    );
  }

  flashMessage(type, message) {
    this.toastService.flash(type, message);
  }

  backToList() {
    this.router.navigate(['/courses']);
  }
}
