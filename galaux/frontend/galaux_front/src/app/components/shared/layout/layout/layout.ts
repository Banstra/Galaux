import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer/footer';
import { Navbuttons } from '../../navbuttons/navbuttons';
import { AuthService } from '../../../../services/auth';

@Component({
  selector: 'app-layout',
  imports: [Navbar, Footer, RouterOutlet, Navbuttons],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  auth = inject(AuthService);
  router = inject(Router);

  get showSubheader(): boolean {
    const onLanding = this.router.url === '/landing' || this.router.url === '/';
    return !(onLanding && !this.auth.isAuth());
  }
}
