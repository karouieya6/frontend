import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-in-area',
  standalone: true,
  templateUrl: './sign-in-area.component.html',
  styleUrls: ['./sign-in-area.component.scss'],
  imports: [
    RouterModule
  ],
})
export class SignInAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
