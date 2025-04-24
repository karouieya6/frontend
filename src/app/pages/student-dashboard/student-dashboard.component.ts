import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class StudentDashboardComponent implements OnInit {
  courses: any[] = [];
  enrolledCourses: any[] = [];
  userId!: number;

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token not found');
      return;
    }

    const decoded: any = jwtDecode(token);
    this.userId = decoded.id || decoded.userId || decoded.sub;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    // ✅ Get all available courses
    this.http.get<any[]>('http://localhost:8082/api/courses', { headers }).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });

    // ✅ Get enrolled courses for this user
    this.userService.getEnrolledCourses(this.userId).subscribe({
      next: (enrolled) => {
        this.enrolledCourses = enrolled;
      },
      error: (err) => {
        console.error('Failed to load enrolled courses', err);
      }
    });
  }

  enroll(courseId: number) {
    let token: string | null = null;
  
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
  
    if (!token) {
      alert('User not logged in');
      return;
    }
  
    const decoded: any = jwtDecode(token);
    const userId = decoded.id || decoded.userId || decoded.sub;
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    const enrollmentRequest = {
      userId: userId,
      courseId: courseId,
    };
  
    this.http.post('http://localhost:8090/api/enrollments', enrollmentRequest, { headers }).subscribe({
      next: () => {
        alert('Enrolled successfully!');
        this.userService.getEnrolledCourses(userId).subscribe({
          next: (enrolled) => this.enrolledCourses = enrolled
        });
      },
      error: (err) => {
        console.error('Enrollment failed:', err);
        alert('Enrollment failed!');
      }
    });
  }
}