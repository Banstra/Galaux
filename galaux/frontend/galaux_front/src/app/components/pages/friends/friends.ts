import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';  // ← Added
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}
@Component({
  selector: 'app-friends',
  standalone: true,  // ← Critical!
  imports: [
    CommonModule,     // ← For *ngIf, ngClass
    TableModule,
    AvatarModule,
    ButtonModule,
    TooltipModule,
    ToastModule,
    CheckboxModule,
  ],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
  providers: [MessageService]
})
export class Friends implements OnInit {
  friends: Friend[] = [];
  selectedFriends: Friend[] = [];

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.friends = [
      { id: 1, name: 'Алексей Иванов', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online' },
      { id: 2, name: 'Мария Петрова', avatar: 'https://i.pravatar.cc/150?img=5', status: 'away' },
      { id: 3, name: 'Дмитрий Сидоров', avatar: 'https://i.pravatar.cc/150?img=3', status: 'offline', lastSeen: '2 часа назад' },
      { id: 4, name: 'Елена Кузнецова', avatar: 'https://i.pravatar.cc/150?img=9', status: 'online' },
      { id: 5, name: 'Иван Смирнов', avatar: 'https://i.pravatar.cc/150?img=11', status: 'offline', lastSeen: 'вчера' }
    ];
  }

  getStatusClass(status: string): string {
    return {
      'online': 'bg-green-500',
      'away': 'bg-yellow-500',
      'offline': 'bg-gray-400'
    }[status] || 'bg-gray-400';
  }

  getStatusText(status: string): string {
    return {
      'online': 'В сети',
      'away': 'Отошел',
      'offline': 'Не в сети'
    }[status] || '';
  }

  removeFriend(friend: Friend) {
    this.friends = this.friends.filter(f => f.id !== friend.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: `${friend.name} удален из списка`
    });
  }

  sendMessage(friend: Friend) {
    this.messageService.add({
      severity: 'info',
      summary: 'Чат',
      detail: `Открыт диалог с ${friend.name}`
    });
  }

  getOnlineCount(): number {
    return this.friends.filter(f => f.status === 'online').length;
  }

  getOfflineCount(): number {
    return this.friends.filter(f => f.status !== 'online').length;
  }

  getAvatarColor(id: number): string {
    const colors = ['#3b82f6', '#7c3aed', '#059669', '#ea580c', '#db2777'];
    return colors[id % colors.length];
  }
}
