import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';

interface ServerCard {
  name: string;
  description: string;
  tags: string[];
  online: string;
}

interface SafetyCard {
  title: string;
  description: string;
  extra?: string;
}

interface SafetySection {
  id: number;
  layout: 'cards-left' | 'image-left';
  imageUrl: string;
  cards?: SafetyCard[];
  textContent?: {
    title: string;
    paragraphs: string[];
  };
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, InputTextModule, ChipModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  filters: string[] = [
    'Мини-игры',
    'Инклюзивные',
    'Без голоса',
    'С родителями',
    'Для новичков',
    'Выживание',
  ];

  servers: ServerCard[] = Array(12).fill({
    name: 'название',
    description: 'Привет, это тестовый текст',
    tags: ['Мини-игры', 'Инклюзивный'],
    online: '124/200 человек онлайн',
  });

  visibleCount = 8;
  step = 4;

  // Блок безопасности с картинками из папки img (предполагаем, что папка img в assets)
  safetySections: SafetySection[] = [
    {
      id: 1,
      layout: 'cards-left', // карточки слева, картинка справа
      imageUrl: 'img/image_safety_1.png',
      cards: [
        {
          title: 'Модерация чата',
          description: 'Автоматический фильтр мата и оскорблений, модераторы 24/7.',
          extra: 'Подробнее →',
        },
        {
          title: 'Защита аккаунта',
          description: 'Двухфакторная аутентификация и система восстановления.',
          extra: 'Подробнее →',
        },
        {
          title: 'Контроль времени',
          description: 'Родительский контроль: лимит игрового времени для детей.',
          extra: 'Подробнее →',
        },
      ],
    },
    {
      id: 2,
      layout: 'image-left', // картинка слева, карточки справа
      imageUrl: 'img/image_safety_2.png',
      cards: [
        // теперь здесь тоже карточки, а не textContent
        {
          title: 'Дружелюбное комьюнити',
          description: 'Наказания за буллинг и токсичность, безопасная среда для каждого игрока.',
          extra: 'Подробнее →',
        },
        {
          title: 'Активная поддержка',
          description: 'Discord-сервер 24/7, регулярные ивенты и конкурсы.',
          extra: 'Подробнее →',
        },
        {
          title: 'Помощь новичкам',
          description: 'Всегда поможем освоиться и найти друзей.',
          extra: 'Подробнее →',
        },
      ],
    },
    {
      id: 3,
      layout: 'cards-left',
      imageUrl: 'img/image_safety_3.png',
      cards: [
        {
          title: 'Регулярные бекапы',
          description: 'Ваши достижения и постройки никогда не пропадут.',
          extra: 'Подробнее →',
        },
        {
          title: 'Анти-чит система',
          description: 'Современная защита от нечестной игры.',
          extra: 'Подробнее →',
        },
        {
          title: 'SSL-шифрование',
          description: 'Все данные передаются по защищённому каналу.',
          extra: 'Подробнее →',
        },
      ],
    },
  ];

  get visibleServers(): ServerCard[] {
    return this.servers.slice(0, this.visibleCount);
  }

  showMore(): void {
    this.visibleCount += this.step;
    if (this.visibleCount > this.servers.length) {
      this.visibleCount = this.servers.length;
    }
  }

  downloadLauncher(type: 'pc' | 'mobile'): void {
    const links = {
      pc: 'https://example.com/launcher.exe',
      mobile: 'https://example.com/launcher.apk',
    };
    window.open(links[type], '_blank');
  }

  register(): void {
    alert('Регистрация');
  }

  playNow(): void {
    alert('Начать играть');
  }

  onFilterClick(filter: string): void {
    alert(`Фильтр: ${filter}`);
  }

  onPlayClick(server: ServerCard): void {
    alert(`Играть на сервере ${server.name}`);
  }
}
