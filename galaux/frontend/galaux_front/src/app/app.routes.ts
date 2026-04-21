import { Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import {Layout} from './components/shared/layout/layout/layout';
import {Register} from './components/pages/register/register';

import {Main} from './components/pages/main/main';
import {Friends} from './components/pages/friends/friends';
import {Messages} from './components/pages/messages/messages';
import {Profile} from './components/pages/profile/profile';
import {ProfileOther} from './components/pages/profile-other/profile-other';
import {Servers} from './components/pages/servers/servers';
import {Options} from './components/pages/options/options';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: 'landing',
      component: LandingComponent
    },{
      path: 'main',
      component: Main
    },{
      path: 'friends',
      component: Friends
    },{
      path: 'messages',
      component: Messages
    },{
      path: 'profile',
      component: Profile
    },{
      path: 'profile-other',
      component: ProfileOther
    },{
      path: 'servers',
      component: Servers
    },{
      path: 'options',
      component: Options
    },
    ]
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
