import {Injectable} from '@angular/core';
import {Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {ICourse} from '../shared/course.model';
import {CourseDataService} from '../shared/course-data.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseDetailResolverService implements Resolve<any> {

  constructor(
    private courseDataService: CourseDataService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ICourse> {

    return this.courseDataService.getCourse(route.params['id']).toPromise()
      .then(course => {
      if (course) {
        return course;
      } else { // id not found
        this.router.navigate(['/courses']);
      }
    }).catch((e) => {
        this.router.navigate(['/courses']);
      });
  }

}
