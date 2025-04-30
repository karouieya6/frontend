import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  styleUrls: ['./header-three.component.scss'],
  imports: [CommonModule, RouterModule, NgbDropdownModule],
})
export class HeaderThreeComponent implements OnInit {
  user: any = null;
  isLoggedIn: boolean = false;
  headerSticky: boolean = false;
  searchBar: boolean = false;
  showSidebar: boolean = false;
  
  userProfilePic: string = 'assets/img/user/userprofile.png';
  userName: string = '';
  userEmail: string = '';
  mode: string = 'light';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.headerSticky = window.pageYOffset > 50;
  }
  handleSearch() {
    this.searchBar = !this.searchBar;
  }

  handleSearchClose() {
    this.searchBar = false;
  }

  handleSidebar() {
    this.showSidebar = true;
    document.querySelector('.sidebar')?.classList.add('active');
  }

  handleSidebarClose() {
    this.showSidebar = false;
    document.querySelector('.sidebar')?.classList.remove('active');
  }

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.changeTheme(savedTheme);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
  
    if (!token) {
      this.isLoggedIn = false;
      this.user = null;
      this.userName = '';
      this.userEmail = '';
      this.userProfilePic = 'assets/img/user/userprofile.png';
      return;
    }
  
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.isLoggedIn = true;
        this.userName = res.name || 'User';
        this.userEmail = res.email || 'example@gmail.com';
        this.userProfilePic = res.profilePic || this.userProfilePic;
      },
      error: (err) => {
        this.isLoggedIn = false;
        this.user = null;
        this.userName = '';
        this.userEmail = '';
        this.userProfilePic = 'assets/img/user/userprofile.png';
        if (err.status === 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/sign-in']);
        }
      },
    });
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/sign-in' || url === '/sign-up' || url === '/forgot-password' || url === '/reset-password';
  }

  logout() {
    this.userService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.user = null;
        this.userName = '';
        this.userEmail = '';
        this.userProfilePic = 'assets/img/user/userprofile.png';
        this.router.navigate(['/']);
      },
      error: (err: unknown) => {
        console.error('Logout failed:', err);
        this.isLoggedIn = false;
        this.user = null;
        this.userName = '';
        this.userEmail = '';
        this.userProfilePic = 'assets/img/user/userprofile.png';
        this.router.navigate(['/']);
      },
    });
  }

  changeTheme(theme: string) {
    this.mode = theme;
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}