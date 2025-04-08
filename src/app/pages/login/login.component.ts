import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  goToRegister() {
    this.router.navigateByUrl('/register');
  }
  
  handleLogin() {
    this.http.post('http://localhost:8081/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem('authToken', token);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('No token received');
        }
      },
      error: (err) => {
        const msg = err.error?.message || 'Login failed';
        alert(msg);
      }
    });
  }
}