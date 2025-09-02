import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IChat, IMessage } from '../interfaces/chats.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<IChat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<IChat[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<IChat>(`${this.chatsUrl}${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<IMessage>(
      `${this.messageUrl}${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
