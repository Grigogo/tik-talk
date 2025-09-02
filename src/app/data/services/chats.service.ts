import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IChat, ILastMessageResponse, IMessage} from '../interfaces/chats.interface';
import {ProfileService} from './profile.service';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<IChat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<ILastMessageResponse[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<IChat>(`${this.chatsUrl}${chatId}`)
      .pipe(map(chat => {
        return {
          ...chat,
          companion: chat.userFirst.id === this.me()!.id ? chat.userSecond : chat.userFirst,
        }
      }));
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<IMessage>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      },
    );
  }
}
