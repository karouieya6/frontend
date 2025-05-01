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
    window.location.href = '/';

  }
  logNav() {
    console.log("Navigating to edit-profile...");
    this.router.navigate(['/student/edit-profile']);
  }
  
}
