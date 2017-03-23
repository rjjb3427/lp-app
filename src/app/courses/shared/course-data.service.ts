import {Injectable} from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {ICourse} from "./course.model";
import {AuthService} from "../../user/shared/auth.service";

@Injectable()
export class CourseDataService {
  private CoursesApi = 'http://localhost:3000/api/courses';

  constructor(
    private http: Http,
    private auth: AuthService
  ) {
  }

  getCourses(): Observable <ICourse> {
    return this.http.get(this.CoursesApi, {headers: this.createHeader()})
      .map(CourseDataService.extractData)
      .catch(CourseDataService.handleError)
  }

  getCourse(id): Observable <ICourse> {
    return this.http.get(`${this.CoursesApi}/${id}`, {headers: this.createHeader()})
      .map(CourseDataService.extractData)
      .catch(CourseDataService.handleError)
  }

  addNewCourse(course): Observable <ICourse> {
    return this.http.post(this.CoursesApi, JSON.stringify(course), {headers: this.createHeader()})
      .map(CourseDataService.extractData)
      .catch(CourseDataService.handleError)
  }

  private createHeader() {
    return new Headers({
      'Content-Type': 'application/json',
      "x-auth": this.auth.getToken()
    });
  }

  private static extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private static handleError(error: Response | any) {
    // Todo use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
