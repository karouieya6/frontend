import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/userservice/auth'; // Base URL for auth endpoints
  private userApiUrl = 'http://localhost:8080/userservice/user'; // Base URL for user-related endpoints

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.saveToken(response.token);
          // Optionally save user data
          localStorage.setItem('user', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError('login'))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      catchError(this.handleError('register'))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): Observable<boolean> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/logout`, {}, { headers }).pipe(
      map(() => true), // Transform the response to a boolean
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/sign-in']);
      }),
      catchError((error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/sign-in']);
        return of(true);
      })
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getEnrolledCourses(userId: number): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/api/enrollments/user/${userId}`, { headers }).pipe(
      catchError(this.handleError<any[]>('getEnrolledCourses', []))
    );
  }

  getProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.userApiUrl}/profile`, { headers }).pipe(
      tap((user) => {
        // Optionally save user data to localStorage
        localStorage.setItem('user', JSON.stringify(user));
      }),
      catchError(this.handleError('getProfile'))
    );
  }

  updateProfile(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.userApiUrl}/profile`, data, { headers }).pipe(
      tap((updatedUser) => {
        // Update localStorage with the new user data
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }),
      catchError(this.handleError('updateProfile'))
    );
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  changePassword(data: any) {
    return this.http.put('/userservice/user/change-password', data);
  }
  // Error handling utility
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      // Return a default result to keep the app running
      return of(result as T);
    };
  }
}