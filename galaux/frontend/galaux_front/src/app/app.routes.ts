import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import {Layout} from './components/shared/layout/layout/layout';
import {Register} from './components/pages/register/register';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [{
      path: 'landing',
      component: LandingComponent
    }]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'register',
    component: Register
  },
/*  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  }*/
];
