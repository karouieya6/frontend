import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/auth'; // adapt if needed

  constructor(private http: HttpClient) {}

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
  getEnrolledCourses(userId: number): Observable<any[]> {
    const token = localStorage.getItem('token');
  
    const headers = {
      'Authorization': `Bearer ${token}`
    };
  
    // Make sure this URL matches the port of your EnrollmentService
    return this.http.get<any[]>(`http://localhost:8080/api/enrollments/user/${userId}`, { headers });
  }
  
}
