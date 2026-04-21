import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  conversations: Conversation[] = [];
  messages: Message[] = [];
  selectedConversation: Conversation | null = null;
  newMessageText: string = '';

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
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

    this.selectConversation(this.conversations[0]);
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.id);
  }

  loadMessages(_conversationId: number) {
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
      this.messages.push({
        id: this.messages.length + 1,
        text: this.newMessageText,
        senderId: 0,
        timestamp: new Date(),
        isOwn: true
      });
      this.newMessageText = '';

      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 50);
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
