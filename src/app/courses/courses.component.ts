import {Component} from '@angular/core';

@Component({
  selector: 'lp-course',
  templateUrl: 'courses.component.html',
  styleUrls: ['courses.component.scss']
})
export class CoursesComponent {
  addMode = false;

  toggleAddMode = function () {
    this.addMode = !this.addMode
  }
}
