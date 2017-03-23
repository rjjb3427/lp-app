import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'lp-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentUser;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  isUserLoggedIn() {
    if (this.auth.isUserLoggedIn()) {
      this.currentUser = this.auth.getCurrentUser();
      return this.currentUser;
    }
    return false;
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.auth.logout().subscribe(
      (data) => {
        console.log(data);
        this.auth.removeToken();
      },
      (error) => {
        console.log(error);
        this.auth.removeToken();
      }
    );
  }

}
