import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderThreeComponent } from '../../pages/Home/header-three/header-three.component';
import { FooterComponent } from '../../common/footer/footer.component'
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [HeaderThreeComponent, FooterComponent, RouterModule,CommonModule],
    template: `
      <app-header-three />
      <main class="main-content-area">
        <router-outlet></router-outlet>
      </main>
      <app-footer />
    `,
  })
  export class MainLayoutComponent {}
  