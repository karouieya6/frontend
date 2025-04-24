import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-area',
  standalone: true,
  templateUrl: './sign-up-area.component.html',
  styleUrls: ['./sign-up-area.component.scss'],
  imports: [
    RouterModule,
    FormsModule
  ],
})
export class SignUpAreaComponent implements OnInit {

  registerData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log('User registration data:', this.registerData);

    // TODO: call your backend API here
  }
}
