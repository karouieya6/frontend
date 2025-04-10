import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule, RouterModule, HttpClientModule],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  handleLogin() {
    this.http
      .post<any>('http://localhost:8081/auth/login', {
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: (data) => {
          console.log('Login success:', data);

          const token = data.token || data.accessToken; // Make sure this matches your backend
          if (!token) {
            alert('No token received from server');
            return;
          }

          localStorage.setItem('token', token);

          const decoded: any = jwtDecode(token);
          const roles: string[] = decoded.roles;

          if (roles.includes('STUDENT')) {
            this.router.navigate(['/student-dashboard']);
          } else if (roles.includes('INSTRUCTOR')) {
            this.router.navigate(['/instructor-dashboard']);
          } else if (roles.includes('ADMIN')) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            alert('Unknown role.');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Login error! Check your credentials.');
        },
      });
  }
}
