import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lp-user',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-md-6 login">
          <lp-login></lp-login>
        </div>
        <div class="col-md-6 register">
          <lp-register></lp-register>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
