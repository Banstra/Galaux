import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import {Navbuttons} from '../../shared/navbuttons/navbuttons';

export interface Server {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
  players: { current: number; max: number };
  rating: number; // 1-5
}
@Component({
  selector: 'app-servers',
  standalone: true,
  imports: [CommonModule,
    InputTextModule,
    ButtonModule,
    Navbuttons],
  templateUrl: './servers.html',
  styleUrl: './servers.css',
})
export class Servers implements OnInit {
  servers: Server[] = [];
  filters: string[] = [];
  searchQuery: string = '';

  ngOnInit() {
    this.generateMockData();
    this.filters = ['Категория 1', 'Категория 2', 'Категория 3', 'Режим', 'Сложность', 'Язык', 'Возраст'];
  }

  // Генерация тестовых данных, чтобы заполнить сетку как на макете
  generateMockData() {
    const mockServers: Server[] = [];
    for (let i = 1; i <= 12; i++) {
      mockServers.push({
        id: i,
        name: `Survival #${i}`,
        description: 'Лучший сервер для выживания с друзьями. Без вайпов!',
        image: 'https://picsum.photos/400/250?random=' + i, // Случайная картинка
        tags: ['Мини-игры', 'Инклюзивный'],
        players: { current: 124 + i, max: 200 },
        rating: 5
      });
    }
    this.servers = mockServers;
  }

  // Можно добавить логику фильтрации, если нужно
  applyFilters() {
    console.log('Фильтры применены для:', this.searchQuery);
  }
}
