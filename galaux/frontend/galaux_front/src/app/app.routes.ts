import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AuthComponent } from './components/pages/auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];
