import { Component } from '@angular/core'
import { CounterStateComponent } from './components/counter-state/counter-state.component'
import { CourseListComponent } from './components/course-list/course-list.component'
import { SidebarComponent } from '../sidebar/sidebar.component'
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CounterStateComponent,
    CourseListComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ``,
})
export class DashboardComponent {}
