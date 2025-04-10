import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // ✅ import to decode token

@Component({
  standalone: true,
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  imports: [CommonModule, HttpClientModule, RouterModule],
})
export class StudentDashboardComponent implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    console.log('Fetching courses with token:', token);
  
    this.http.get<any[]>('http://localhost:8082/api/courses', { headers }).subscribe({
      next: (data) => {
        console.log('Courses received:', data);
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }
  
  

  enroll(courseId: number) {
    const token = localStorage.getItem('token');
  
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
  
    this.http.post('http://localhost:8080/api/enrollments', enrollmentRequest, { headers }).subscribe({
      next: () => alert('Enrolled successfully!'),
      error: (err) => {
        console.error('Enrollment failed:', err);
        alert('Enrollment failed!');
      }
    });
  }
  
}
