import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'lp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userRegister;
  private registerResult: any;
  private errorMessage: any;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userRegister = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    };
  }

  signup(register, isValid: Boolean) {
    if (isValid) {
      this.auth.register(register).subscribe(
        data => this.registerResult = data,
        error => this.errorMessage = <any>error,
        () => {
          if (this.registerResult) {
            this.auth.setToken(this.registerResult.header['x-auth']);
            this.auth.setCurrentUser(this.registerResult.body);
            this.router.navigate(['/profile']);
          }
        }
      );
    }
  }

}
