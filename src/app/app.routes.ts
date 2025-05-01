import { Routes } from '@angular/router';
import { HomeThreeComponent } from './pages/Home/home-three-main/home-three.component';
import { DashboardComponent } from './pages/student-dashboard/student/dashboard/dashboard.component';
import { MainLayoutComponent } from './pages/mainlayoutcomponent/mainlayout.component';
import { AuthGuard } from './services/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeThreeComponent },
      { path: 'dashboard', component: DashboardComponent }  // ✅ You keep this
    ]
  },

  {
    path: 'student',
    loadChildren: () =>
      import('./pages/student-dashboard/student/student.route').then(m => m.STUDENT_ROUTES),
    canActivate: [AuthGuard]
  },

  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up-main/sign-up-main.component').then(m => m.SignUpMainComponent)
  },

  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in-main/sign-in-main.component').then(m => m.SignInMainComponent)
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
