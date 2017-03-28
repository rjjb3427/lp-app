import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ICourse} from '../shared/course.model';
import {CourseDataService} from '../shared/course-data.service';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../../user/shared/auth.service';
import {UploadService} from '../../shared/upload.service';

@Component({
  selector: 'lp-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  public course: ICourse;
  postResult: any;
  errorMessage: string;

  ApiURL = 'http://localhost:3000/api/upload';
  public uploader: FileUploader = new FileUploader({url: this.ApiURL});

  @Output()
  cancelAddCourse = new EventEmitter();

  constructor(private auth: AuthService,
              private upload: UploadService,
              private dataService: CourseDataService) {
  }

  ngOnInit() {
    // we will initialize our form here
    this.course = {
      title: 'Computer basics',
      _id: '',
      _userId: '',
      _paths: [],
      __v: null,
      completedAt: null,
      completed: false,
      imgURL: '',
      author: 'Mohi Khalii',
      link: '',
      platform: 'Lynda',
      categories: [],
      description: '',
      publishedDate: null
    };
  }

  save(model, isValid: boolean) {
    // check if model is valid
    if (isValid) {
      this.upload.uploadSingleFile(this.uploader, this.uploader.queue[0])
        .then((res) => {
        let results;
          if (res.status === 'success') {
            results = JSON.parse(res.response);
            model.imgURL = results.filename;
            console.log(model.imgURL);
            this.addCourse(model);
          }
        })
        .catch((e) => {
        console.log(e)
          if (e.status === 'error') {
            // flash message that image not uploaded with error before adding the course
            // ask to save the course anyway or to re-upload
            // this.addCourse(model);
          } else if (e.status === 'empty') {
            // this.addCourse(model);
          }
        });
    }
  }

  addCourse(model) {
    this.dataService.addNewCourse(model).subscribe(
      data => this.postResult = data,
      error => this.errorMessage = <any>error,
      () => {
        if (this.postResult) {
          this.cancelAddCourse.emit();
        }
      }
    );
  }

  cancel() {
    this.cancelAddCourse.emit();
  }

}
