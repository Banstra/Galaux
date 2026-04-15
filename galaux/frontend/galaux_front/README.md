# Galaux — Frontend

Angular-приложение для платформы Galaux. Работает в связке с Laravel-бэкендом.

## Требования

- Node.js >= 20
- npm >= 10
- Angular CLI >= 21 (`npm install -g @angular/cli`)
- PHP >= 8.2 (для бэкенда)
- Composer (для бэкенда)

---

## Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Banstra/Galaux.git
cd Galaux
```

### 2. Запустить бэкенд (Laravel)

```bash
cd galaux

# Установить PHP-зависимости
composer install

# Скопировать конфиг окружения и сгенерировать ключ
cp .env.example .env
php artisan key:generate

# Запустить миграции
php artisan migrate

# Запустить сервер
php artisan serve
```

Бэкенд будет доступен на `http://localhost:8000`.

### 3. Запустить фронтенд (Angular)

```bash
cd galaux/frontend/galaux_front

# Установить зависимости
npm install

# Запустить dev-сервер
npm start
```

Фронтенд будет доступен на `http://localhost:4200`.

---

## Структура фронтенда

```text
src/
├── app/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── landing/      # Лендинг с кнопкой входа
│   │   │   └── auth/         # Страница авторизации
│   │   └── shared/
│   │       └── navbar/       # Навбар
│   ├── app.routes.ts         # Маршруты
│   ├── app.config.ts         # Конфигурация приложения
│   └── app.ts                # Корневой компонент
└── styles.css                # Глобальные стили
```

## Маршруты

| Путь    | Компонент        | Описание             |
|---------|------------------|----------------------|
| `/`     | LandingComponent | Лендинг              |
| `/auth` | AuthComponent    | Страница авторизации |

---

## Полезные команды

```bash
# Dev-сервер с автоперезагрузкой
npm start

# Production-сборка
npm run build

# Запуск тестов
npm test

# Генерация нового компонента
ng generate component components/pages/my-page
```
