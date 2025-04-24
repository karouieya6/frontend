import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderThreeComponent } from '../header-three/header-three.component';
import { HeroSliderComponent } from '../hero-slider/hero-slider.component';
import { HomeThreeCoursesComponent } from '../home-three-courses/home-three-courses.component';

import { HomeThreeTestimonialComponent } from '../home-three-testimonial/home-three-testimonial.component';
import { PopularTeachersComponent } from '../popular-teachers/popular-teachers.component';
import { RouterModule } from '@angular/router';
import { AboutAreaComponent } from '../../../common/about-area/about-area.component';

import { FooterComponent } from '../../../common/footer/footer.component';
import { BlogAreaComponent } from '../../../blog/blog-area/blog-area.component'; // likely replaces BlogTwoComponent

@Component({
  standalone: true,
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.scss'],
  imports: [
    HeaderThreeComponent,
    HeroSliderComponent,
    HomeThreeCoursesComponent,
    PopularTeachersComponent,

    HomeThreeTestimonialComponent,
    AboutAreaComponent,

    FooterComponent,
    BlogAreaComponent, // ✅ new correct one
    CommonModule,
    RouterModule
  ]
})
export class HomeThreeComponent {}
