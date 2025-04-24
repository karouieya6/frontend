import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../app/common/footer/footer.component'; // or header-two
import { HeaderThreeComponent } from './pages/Home/header-three/header-three.component';
import { SignUpAreaComponent } from './pages/sign-up/sign-up-area/sign-up-area.component';
import { SignInAreaComponent } from './pages/sign-in/sign-in-area/sign-in-area.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet , HeaderThreeComponent, FooterComponent, SignUpAreaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-app';
}
