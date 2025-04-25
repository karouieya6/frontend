import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/userservice/auth'; // Updated to match your actual backend

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getEnrolledCourses(userId: number): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get<any[]>(`${this.baseUrl}/api/enrollments/user/${userId}`, { headers });
  }
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
