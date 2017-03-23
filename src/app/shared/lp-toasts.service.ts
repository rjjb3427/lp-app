import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class LpToastsService {
  public title = '';
  public content = '';

  public toastOptions = {
    timeOut: 2000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: false,
    pauseOnHover: true,
    preventDuplicates: true,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'top']
  };

  constructor(private _service: NotificationsService) {
  }

  flash(type: string, content: string = 'A problem occurred', title: string = '') {
    if (type === 'success') {
      this._service.success(title, content);
    } else if (type === 'error') {
      this._service.error(title, content);
    } else if (type === 'alert') {
      this._service.alert(title, content);
    }
  }

}
