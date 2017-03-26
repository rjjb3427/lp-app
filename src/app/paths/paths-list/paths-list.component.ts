import { Component, OnInit } from '@angular/core';
import {IPath} from '../shared/path.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PathDataService} from '../shared/path-data.service';

@Component({
  selector: 'lp-paths-list',
  templateUrl: './paths-list.component.html',
  styleUrls: ['./paths-list.component.scss']
})
export class PathsListComponent implements OnInit {

  data: IPath;
  errorMessage: string;
  queryParams;
  sortItems = [{
    name: 'Title', value: 'title'
  }, {
    name: 'Author', value: 'author'
  }, {
    name: 'Date', value: 'date'
  }];

  constructor(private dataService: PathDataService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // TODO implement query params for searching
    this.queryParams = this.activatedRoute.snapshot.queryParams;

    this.dataService.getPaths().subscribe(
      data => this.data = data,
      error => this.errorMessage = <any>error
    );
  }

  onSelect(path) {
    this.router.navigate(['/paths', path._id]);
  }

}
