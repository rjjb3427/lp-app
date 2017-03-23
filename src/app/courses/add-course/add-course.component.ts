import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ICourse} from "../shared/course.model";
import {CourseDataService} from "../shared/course-data.service";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'lp-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @ViewChild('addCourse') addCourse;
  public course: ICourse;
  postResult: any;
  errorMessage: string;

  ApiURL = 'api';
  public uploader:FileUploader = new FileUploader({url: this.ApiURL});

  @Output()
  cancelAddCourse = new EventEmitter();

  constructor(
    private dataService: CourseDataService
  ) {
  }

  ngOnInit() {
    // we will initialize our form here
    this.course = {
      title: 'Computer basics',
      _id: '',
      _userId: '',
      __v: null,
      completedAt: null,
      completed: false,
      thumbnailURL: '',
      author: 'Mohi Khalii',
      link: '',
      platform: 'Lynda',
      categories: [],
      description: '',
      publishedDate: null
    };
  }

  save(model: ICourse, isValid: boolean) {
    // check if model is valid
    // if (isValid) {
    //   this.dataService.addNewCourse(model).subscribe(
    //     data => this.postResult = data,
    //     error => this.errorMessage = <any>error,
    //     () => {
    //       if(this.postResult) {
    //         this.cancelAddCourse.emit()
    //       }
    //     }
    //   );
    // }
    this.course.thumbnailURL = this.uploader.queue[0].file.name
    console.log(this.course)
    console.log(model, isValid)
    console.log(this.uploader.queue[0].file.name)
  }

  cancel() {
    this.cancelAddCourse.emit()
  }

}
