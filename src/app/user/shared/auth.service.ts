import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private UsersApi = 'http://localhost:3000/api/users';
  private token;
  private currentUser;
  redirectUrl: string;

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(private http: Http,
              private router: Router) {
    this.token = localStorage.getItem('token');
    this.currentUser = localStorage.getItem('user');
  }

  login(user) {
    return this.http.post(`${this.UsersApi}/login`, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  register(user) {
    return this.http.post(`${this.UsersApi}/register`, JSON.stringify(user), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  isUserLoggedIn() {
    return !!localStorage.getItem('token');
  }

  setCurrentUser(user) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  getCurrentUser() {
    if (this.isUserLoggedIn()) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', this.token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    this.token = undefined;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  logout() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-auth': this.getToken()
    });

    return this.http.delete(`${this.UsersApi}/logout`, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    this.currentUser = {
      header: res.headers.toJSON(),
      body: res.json()
    };
    return this.currentUser || {};
  }

  private handleError(error: Response | any) {
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
