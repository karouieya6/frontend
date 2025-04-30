import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../common/footer/footer.component';
import { HeaderThreeComponent } from '../../../pages/Home/header-three/header-three.component';
@Component({
  selector: 'app-account-layout',
  standalone:true,
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss'],
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderThreeComponent, FooterComponent]
})
export class AccountLayoutComponent {}
