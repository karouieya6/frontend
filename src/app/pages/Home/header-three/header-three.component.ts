import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, NavigationEnd ,Router} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-header-three',
  templateUrl: './header-three.component.html',
  imports: [CommonModule,RouterModule],
  styleUrls: ['./header-three.component.scss']
})
export class HeaderThreeComponent implements OnInit {
  
  headerSticky : boolean = false;
  searchBar : boolean = false;
  showSidebar : boolean = false;
  showHomeDropdown : boolean = false;
  showCoursesDropdown : boolean = false;
  showBlogDropdown : boolean = false;
  showPagesDropdown : boolean = false;

  @HostListener('window:scroll',['$event']) onscroll () {
    if(window.scrollY > 80){
      this.headerSticky = true
    }
    else{
      this.headerSticky = false
    }
  }

  handleSearch () {
    if(!this.searchBar){
      this.searchBar = true;
    }
    else{
      this.searchBar = true;
    }
  }
  handleSearchClose () {
    this.searchBar = false;
  }

  // handleSidebar
  handleSidebar () {
    this.showSidebar = true;
  }
  handleSidebarClose () {
    this.showSidebar = false;
  }

  // home dropdown
  homeDropdown () {
    this.showHomeDropdown = !this.showHomeDropdown
  }
  // coursesDropdown
  coursesDropdown () {
    this.showCoursesDropdown = !this.showCoursesDropdown
  }

  // blogDropdown
  blogDropdown () {
    this.showBlogDropdown = !this.showBlogDropdown
  }
  // pagesDropDown
  pagesDropDown () {
    this.showPagesDropdown = !this.showPagesDropdown
  }


  constructor(private router: Router) {}
  ngOnInit(): void{}
  isAuthPage(): boolean {
    const url = this.router.url;
    return url === '/sign-in' || url === '/sign-up';
  }

}
