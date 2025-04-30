import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../pages/student-dashboard/student/sidebar/sidebar.component'; // ✅ path to your sidebar
import { HeaderThreeComponent } from '../../../pages/Home/header-three/header-three.component';
import { FooterComponent } from '../../../common/footer/footer.component';

@Component({
  selector: 'app-account-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    HeaderThreeComponent,
    FooterComponent
  ],
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent {}
