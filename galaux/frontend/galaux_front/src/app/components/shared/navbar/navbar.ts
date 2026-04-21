import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(AuthService);
  router = inject(Router);

  get onProfile(): boolean {
    return this.router.url === '/profile';
  }

  logout(): void {
    this.auth.isAuth.set(false);
    this.router.navigate(['/landing']);
  }
}
