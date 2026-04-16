import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from '../app/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  protected readonly title = signal('galaux_front');
  ngOnInit() {
    // Восстанавливаем сессию пользователя при загрузке
    const userData = this.authService.getUserData();
    if (userData) {
      // Можно здесь проверить валидность токена
    }
  }
}
