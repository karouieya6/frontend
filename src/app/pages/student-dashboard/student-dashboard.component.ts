import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // ✅ needed for routerLink

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterModule], // ✅ needed to use [routerLink] in template
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  user: any = {};
  enrolledCourses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:8080/userservice/user/profile', { headers }).subscribe((res: any) => {
      this.user = res;
      this.loadCourses(res.id, headers);
    });
  }

  loadCourses(userId: number, headers: HttpHeaders) {
    this.http
      .get<any[]>(`http://localhost:8080/enrollmentservice/api/enrollments/user/${userId}`, { headers })
      .subscribe(
        (courses) => {
          this.enrolledCourses = courses;
        },
        (err) => {
          console.error('❌ Failed to load courses', err);
        }
      );
  }

  getCompletedCourseCount(): number {
    return this.enrolledCourses.filter(course => course.progress === 100).length;
  }
}
