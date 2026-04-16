// src/app/services/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { filter, take, map, BehaviorSubject, catchError, throwError, tap, Observable, of } from 'rxjs';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  login: string;
  email: string;
  password: string;
  is_child: boolean;
  parent_id?: number | null;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
}

export interface UserData {
  id: number;
  login: string;
  name: string;
  email?: string;
  avatar?: string;
  is_child?: boolean;
  // добавьте другие поля по необходимости
}

export type LoginResponse = AuthTokens & { user: UserData };
export type RegisterResponse = AuthTokens & { user: UserData };
export type RefreshResponse = AuthTokens;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'https://www.galauxminecraftapi.ru/api';

  // Состояние пользователя
  private currentUserSubject = new BehaviorSubject<UserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Флаг обновления токена
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  login(credentials: LoginRequest) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials, { headers }).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  register(data: RegisterRequest) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, data, { headers }).pipe(
      tap(response => {
        this.handleAuthSuccess(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  refreshToken(refreshToken: string): Observable<RefreshResponse> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post<RefreshResponse>(`${this.API_URL}/refresh`, { refresh_token: refreshToken }, { headers }).pipe(
      tap(response => {
        this.updateTokens(response);
      }),
      catchError((error: HttpErrorResponse) => {
        this.logout();
        return throwError(() => new Error('Session expired'));
      })
    );
  }

  logout() {
    // Очищаем всё
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('user_data');

    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getCurrentUser(): UserData | null {
    return this.currentUserSubject.value;
  }

  // Приватные методы
  private handleAuthSuccess(response: LoginResponse | RegisterResponse) {
    const { access_token, refresh_token, user } = response;

    // Сохраняем токены
    this.saveTokens(access_token, refresh_token);

    // Сохраняем данные пользователя
    this.currentUserSubject.next(user);
    this.saveUserData(user);
  }

  private saveTokens(accessToken: string, refreshToken: string) {
    const storage = localStorage; // или sessionStorage если нужно

    storage.setItem('access_token', accessToken);
    storage.setItem('refresh_token', refreshToken);
  }

  private updateTokens(response: RefreshResponse) {
    const { access_token, refresh_token } = response;
    this.saveTokens(access_token, refresh_token);
  }

  private saveUserData(user: UserData) {
    localStorage.setItem('user_data', JSON.stringify(user));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  }

  getUserData(): UserData | null {
    const data = localStorage.getItem('user_data') || sessionStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }

  private handleError(error: HttpErrorResponse): string {
    let message = 'Ошибка авторизации';

    switch (error.status) {
      case 401:
        message = 'Неверный логин или пароль';
        break;
      case 403:
        message = 'Доступ запрещён';
        break;
      case 409:
        message = 'Пользователь с таким логином или email уже существует';
        break;
      case 422:
        if (error.error?.errors) {
          message = Object.values(error.error.errors).flat().join('\n');
        } else {
          message = 'Ошибка валидации данных';
        }
        break;
      default:
        message = error.error?.message || 'Произошла ошибка. Попробуйте позже.';
    }

    return message;
  }

  // Метод для вызова из interceptor
  tryRefreshToken(): Observable<boolean> {
    if (this.isRefreshing) {
      // Ждем, пока другой запрос обновит токен
      return this.refreshTokenSubject.pipe(
        filter((val): val is string => val !== null), // Фильтруем null
        take(1),                                      // Берем первое значение
        map(() => true),                              // Преобразуем в true
        catchError(() => of(false))
      );
    }

    const refreshTokenValue = this.getRefreshToken();
    if (!refreshTokenValue) {
      this.logout();
      return of(false);
    }

    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    // ВАЖНО: Добавлен map(() => true)
    return this.refreshToken(refreshTokenValue).pipe(
      tap(() => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next('success');
      }),
      map(() => true), // <--- ВОТ ЭТО ИСПРАВЛЯЕТ ОШИБКУ ТИПОВ
      catchError((error) => {
        this.isRefreshing = false;
        this.logout();
        this.refreshTokenSubject.next(null);
        return of(false);
      })
    );
  }
}
