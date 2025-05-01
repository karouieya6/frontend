import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/sign-in']);
  }
}
