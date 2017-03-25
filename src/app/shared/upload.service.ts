import {Injectable} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AuthService} from '../user/shared/auth.service';

@Injectable()
export class UploadService {
  success = null;
  error = null;
  public uploader: FileUploader = new FileUploader({url: 'http://localhost:3000/api/upload'});

  constructor(private auth: AuthService) {
  }

  uploadSingleFile(uploader, fileItem): Promise<any> {

    return new Promise((resolve, reject) => {
      this.uploader = uploader;
      if (fileItem) {
        this.uploader.queue[0] = fileItem;
        this.uploader.queue[0].withCredentials = false;
        this.uploader.authTokenHeader = 'x-auth';
        this.uploader.authToken = this.auth.getToken();
        this.uploader.queue[0].upload();

        this.uploader.onErrorItem = (item: any, response: any, status: any, headers: any) => {
          this.error = {item, response, status: 'error'};
          reject(this.error);
        };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          this.success = {item, response, status: 'success'};
          resolve(this.success);
        };
      } else {
        reject({status: 'empty'});
      }
    });
  }

}
