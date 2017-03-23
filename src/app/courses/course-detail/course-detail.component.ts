import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import {ICourse} from "../shared/course.model";

@Component({
  selector: 'lp-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: ICourse;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //get the course from resolver
    this.route.data
      .subscribe((data: {courses}) => this.course = data.courses);
    console.log(this.route.data)
  }

  backToList() {
    this.router.navigate(['/courses']);
  }
}
