import {Component, OnInit} from '@angular/core';
import {LpToastsService} from '../shared/lp-toasts.service';

@Component({
  selector: 'lp-user',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 login">
          <lp-login (flashErrorMessage)="flashMessage('error','Invalid Username or Password!')"></lp-login>
        </div>
        <div class="col-md-6 register">
          <lp-register></lp-register>
        </div>
        <simple-notifications [options]="toastOptions"></simple-notifications>
      </div>
    </div>
  `,
  styles: []
})
export class UserComponent implements OnInit {
  public toastOptions;

  constructor(private toast: LpToastsService) {
    this.toastOptions = this.toast.toastOptions;
  }

  flashMessage(type, message) {
    this.toast.flash(type, message);
  }

  ngOnInit() {
  }

}
