// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Пропускаем авторизационные эндпоинты
  const authUrls = ['/api/login', '/api/register', '/api/refresh'];
  if (authUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  // Добавляем токен к запросу
  const token = authService.getAccessToken();
  if (token) {
    req = addToken(req, token);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Пытаемся обновить токен
        return authService.tryRefreshToken().pipe(
          switchMap((success) => {
            if (success) {
              // Повторяем оригинальный запрос с новым токеном
              const newToken = authService.getAccessToken();
              if (newToken) {
                const newReq = addToken(req, newToken);
                return next(newReq);
              }
            }
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
