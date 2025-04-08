import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  username = '';
  password = '';
  role = 'STUDENT';

  constructor(private http: HttpClient, private router: Router) {}
  goToLogin() {
    this.router.navigateByUrl('/login');
  }
  
  handleRegister() {
    this.http.post('http://localhost:8081/auth/register', {
      email: this.email,
      username: this.username,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res: any) => {
        alert(res.message || 'Registration successful!');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        const message = err.error?.message || 'Registration failed';
        alert(message);
      }
    });
  }
}
