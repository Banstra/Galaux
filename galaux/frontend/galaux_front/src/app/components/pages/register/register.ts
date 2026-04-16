import {Component, inject, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {Button, ButtonDirective} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {Checkbox, CheckboxModule} from 'primeng/checkbox';
import { MessageModule } from 'primeng/message';
import {ProgressBar, ProgressBarModule} from 'primeng/progressbar';
import { AuthService, RegisterRequest } from '../../../services/auth';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-register',
  imports: [
    Ripple,
    Button,
    FormsModule,
    ProgressBar,
    Checkbox,
    ButtonDirective
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Форма
  name = '';
  login = '';
  email = '';
  password = '';
  confirmPassword = '';
  isChild = false;
  parentId: number | null = null;

  // UI состояния
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  error = signal<string | null>(null);
  success = signal(false);

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update(v => !v);
  }

  validateForm(): string | null {
    if (!this.name.trim()) return 'Введите имя';
    if (this.name.length > 255) return 'Имя слишком длинное (макс. 255 символов)';

    if (!this.login.trim()) return 'Введите логин';
    if (this.login.length > 255) return 'Логин слишком длинный (макс. 255 символов)';

    if (!this.email.trim()) return 'Введите email';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) return 'Введите корректный email';
    if (this.email.length > 255) return 'Email слишком длинный (макс. 255 символов)';

    if (!this.password) return 'Введите пароль';
    if (this.password.length < 6) return 'Пароль должен содержать минимум 6 символов';

    if (this.password !== this.confirmPassword) {
      return 'Пароли не совпадают';
    }

    if (this.isChild && (this.parentId === null || this.parentId === undefined)) {
      return 'Укажите ID родителя для несовершеннолетнего';
    }

    return null;
  }

  async onSubmit() {
    const validationError = this.validateForm();
    if (validationError) {
      this.error.set(validationError);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    const registerData: RegisterRequest = {
      name: this.name.trim(),
      login: this.login.trim(),
      email: this.email.trim(),
      password: this.password,
      is_child: this.isChild,
      parent_id: this.isChild ? this.parentId : null
    };

    try {
      await this.authService.register(registerData).toPromise();

      this.success.set(true);

      // Через 2 секунды перенаправляем на страницу входа
      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 2000);

    } catch (err: any) {
      this.error.set(err.message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
