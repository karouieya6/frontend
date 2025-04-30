import { Component } from '@angular/core'
import {
  NgbPaginationModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import aos from 'aos'
import { MyCourses } from '../dashboard/data'


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbProgressbarModule
  ],
  templateUrl: './course-list.component.html',
  styles: ``,
})
export class CourseListComponent {
  courseList = MyCourses

  ngOnInit(): void {
    aos.init()
  }
}
