import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthService} from '../../user/shared/auth.service';
import {Observable} from 'rxjs/Observable';
import {IPath} from './path.model';

@Injectable()
export class PathDataService {
  private PathsApi = 'http://localhost:3000/api/paths';

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

  constructor(private http: Http,
              private auth: AuthService) {
  }

  getPaths(): Observable<IPath> {
    return this.http.get(this.PathsApi, {headers: this.createHeader()})
      .map(PathDataService.extractData)
      .catch(PathDataService.handleError);
  }

  getPath(id): Observable<IPath> {
    return this.http.get(`${this.PathsApi}/${id}`, {headers: this.createHeader()})
      .map(PathDataService.extractData)
      .catch(PathDataService.handleError);
  }

  addNewPath(Path): Observable<IPath> {
    return this.http.post(this.PathsApi, JSON.stringify(Path), {headers: this.createHeader()})
      .map(PathDataService.extractData)
      .catch(PathDataService.handleError);
  }

  private createHeader() {
    return new Headers({
      'Content-Type': 'application/json',
      'x-auth': this.auth.getToken()
    });
  }

}
