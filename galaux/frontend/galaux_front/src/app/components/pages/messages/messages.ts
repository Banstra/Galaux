import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import {TabsModule} from 'primeng/tabs';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import {Navbuttons} from '../../shared/navbuttons/navbuttons';
import { MenuItem } from 'primeng/api';

// src/app/models/messenger.models.ts
export interface Message {
  id: number;
  text: string;
  senderId: number;
  timestamp: Date;
  isOwn: boolean;
}

export interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    BadgeModule,
    PanelModule,
    TabsModule,
    ToggleSwitchModule,
    Navbuttons
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit{
  conversations: Conversation[] = [];
  messages: Message[] = [];
  selectedConversation: Conversation | null = null;
  newMessageText: string = '';

  // Настройки
  darkTheme: boolean = false;
  soundEnabled: boolean = true;
  keyboardEnabled: boolean = true;

  // Меню навигации
  navItems: MenuItem[] = [];

  // Вкладки
  tabs: MenuItem[] = [
    { label: 'Сервера', icon: 'pi pi-server' },
    { label: 'Новости', icon: 'pi pi-newspaper' },
    { label: 'Сообщения', icon: 'pi pi-comments' },
    { label: 'Друзья', icon: 'pi pi-users' },
    { label: 'Настройки', icon: 'pi pi-cog' }
  ];

  ngOnInit() {
    this.loadConversations();
    this.initNavItems();
  }

  initNavItems() {
    this.navItems = [
      { label: 'Главная', icon: 'pi pi-home' },
      { label: 'Правила', icon: 'pi pi-book' },
      { label: 'Помощь', icon: 'pi pi-question-circle' },
      { label: 'Лаунчер', icon: 'pi pi-download' }
    ];
  }

  loadConversations() {
    // Пример данных
    this.conversations = [
      {
        id: 1,
        name: 'Александр',
        lastMessage: 'Привет! Как дела?',
        lastMessageTime: new Date(),
        unreadCount: 2,
        isOnline: true
      },
      {
        id: 2,
        name: 'Мария',
        lastMessage: 'Договорились, до встречи!',
        lastMessageTime: new Date(Date.now() - 3600000),
        unreadCount: 0,
        isOnline: false
      },
      {
        id: 3,
        name: 'Иван',
        lastMessage: 'Отправил файлы',
        lastMessageTime: new Date(Date.now() - 7200000),
        unreadCount: 1,
        isOnline: true
      },
      {
        id: 4,
        name: 'Елена',
        lastMessage: 'Спасибо большое!',
        lastMessageTime: new Date(Date.now() - 86400000),
        isOnline: false
      },
      {
        id: 5,
        name: 'Дмитрий',
        lastMessage: 'Когда будем встречаться?',
        lastMessageTime: new Date(Date.now() - 172800000),
        unreadCount: 3,
        isOnline: true
      }
    ];

    // Загружаем сообщения для первого диалога
    this.selectConversation(this.conversations[0]);
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.id);
  }

  loadMessages(conversationId: number) {
    // Пример сообщений
    this.messages = [
      {
        id: 1,
        text: 'Привет! Как твои дела?',
        senderId: 1,
        timestamp: new Date(Date.now() - 3600000),
        isOwn: false
      },
      {
        id: 2,
        text: 'Привет! Всё отлично, спасибо! А у тебя?',
        senderId: 0,
        timestamp: new Date(Date.now() - 3500000),
        isOwn: true
      },
      {
        id: 3,
        text: 'Тоже всё хорошо. Что нового?',
        senderId: 1,
        timestamp: new Date(Date.now() - 3400000),
        isOwn: false
      },
      {
        id: 4,
        text: 'Да ничего особенного, работаю над новым проектом на Angular',
        senderId: 0,
        timestamp: new Date(Date.now() - 3300000),
        isOwn: true
      }
    ];
  }

  sendMessage() {
    if (this.newMessageText.trim()) {
      const newMessage: Message = {
        id: this.messages.length + 1,
        text: this.newMessageText,
        senderId: 0,
        timestamp: new Date(),
        isOwn: true
      };

      this.messages.push(newMessage);
      this.newMessageText = '';

      // Прокрутка вниз
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  formatTime(date: Date): string {
    return new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}
