import {Component, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Button, ButtonDirective, ButtonIcon} from 'primeng/button';
import { AuthService, LoginRequest } from '../../../services/auth';
import {ProgressBar} from 'primeng/progressbar';
import {Message} from 'primeng/message';
import {InputText} from 'primeng/inputtext';
import {Checkbox} from 'primeng/checkbox';


@Component({
  selector: 'app-auth',
  imports: [FormsModule, RouterLink, Button, ButtonDirective, ProgressBar, Message, InputText, Checkbox, ButtonIcon],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  login = '';
  password = '';
  showPassword = signal(false);

  isLoading = signal(false);
  error = signal<string | null>(null);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  async onSubmit() {
    // Валидация
    if (!this.login.trim()) {
      this.error.set('Введите логин');
      return;
    }
    if (!this.password) {
      this.error.set('Введите пароль');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const credentials: LoginRequest = {
      login: this.login.trim(),
      password: this.password
    };

    try {
      await this.authService.login(credentials).toPromise();

      // Успешный вход - перенаправляем
      this.router.navigate(['/dashboard']); // или куда нужно

    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
