import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IPath} from '../shared/path.model';
import {PathDataService} from '../shared/path-data.service';

@Component({
  selector: 'lp-add-path',
  templateUrl: './add-path.component.html',
  styleUrls: ['./add-path.component.scss']
})
export class AddPathComponent implements OnInit {
  public path: IPath;
  postResult: any;
  errorMessage: string;

  @Output()
  cancelAddPath = new EventEmitter();

  constructor(private dataService: PathDataService) {
  }

  ngOnInit() {
    this.path = {
      title: 'Computer basics',
      _id: '',
      _userId: '',
      _courses: [],
      __v: null,
      completed: false,
      categories: [],
      description: ''
    };
  }

  save(model, isValid: boolean) {
    // check if model is valid
    if (isValid) {
      this.dataService.addNewPath(model).subscribe(
        data => {
          console.log(data)
          return this.postResult = data;
        },
        error => {
          return this.errorMessage = <any>error;
        },
        () => {
          this.cancelAddPath.emit();
        }
      );
    }
  }

  cancel() {
    this.cancelAddPath.emit();
  }

}
