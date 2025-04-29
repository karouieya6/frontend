import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/Home/home-three-main/home-three.component').then(m => m.HomeThreeComponent),
  },

  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up-main/sign-up-main.component').then(m => m.SignUpMainComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./pages/sign-in/sign-in-main/sign-in-main.component').then(m => m.SignInMainComponent),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: 'student-dashboard',
    loadComponent: () => import('./pages/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
