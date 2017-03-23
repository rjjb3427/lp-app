import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin;
  @Output()
  flashErrorMessage = new EventEmitter();

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.userLogin = {
      email: '',
      password: ''
    };
  }

  signin(login, isValid: Boolean) {

    if (isValid) {
      this.auth.login(login).subscribe(
        data => {
          this.auth.setToken(data.header['x-auth']);
          this.auth.setCurrentUser(data.body);
          this.router.navigate(['/profile']);
          },
        error => {
          this.flashErrorMessage.emit();
          this.router.navigate(['/login']);
        }
      );
    }
  }
}
