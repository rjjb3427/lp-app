import {Component, OnInit} from '@angular/core';
import {ICourse} from '../shared/course.model';
import {CourseDataService} from '../shared/course-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'lp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  data: ICourse;
  errorMessage: string;
  queryParams;
  sortItems = [{
    name: 'Title', value: 'title'
  }, {
    name: 'Author', value: 'author'
  }, {
    name: 'Date', value: 'date'
  }];

  constructor(private dataService: CourseDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // TODO implement query params for searching the courses
    this.queryParams = this.activatedRoute.snapshot.queryParams;

    this.dataService.getCourses().subscribe(
      data => this.data = data,
      error => this.errorMessage = <any>error
    );
  }

  onSelect(course) {
    this.router.navigate(['/courses', course._id]);
  }

}
