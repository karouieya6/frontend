import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// keep this

@Component({
  selector: 'app-sign-in-area',
  standalone: true,
  templateUrl: './sign-in-area.component.html',
  styleUrls: ['./sign-in-area.component.scss'],
  imports: [
    RouterModule,
    FormsModule
  ],
})
export class SignInAreaComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };
  ngOnInit(): void {
    // you can leave it empty for now
  }
  public hideHeader: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
 // inject here!
  ) {}



  onLogin() {
    const payload = {
      email: this.loginData.email.trim(),
      password: this.loginData.password
    };

    this.http.post('http://localhost:8080/userservice/auth/login', payload, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res: any) => {
        console.log('✅ Login success:', res);
        alert('Welcome back!');
        localStorage.setItem('token', res.token);
        // 👇 Show header again after login
        this.router.navigate(['/student-dashboard']);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert('Invalid username or password.');
      }
    });
  }
}
