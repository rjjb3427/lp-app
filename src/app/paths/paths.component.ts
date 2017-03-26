import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lp-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent implements OnInit {
  addMode = false;

  toggleAddMode = function () {
    this.addMode = !this.addMode;
  };

  ngOnInit() {
  }

}
