import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IChat,
  ILastMessageResponse,
  IMessage,
} from '@tt/interfaces/chats/chats.interface';
import { ProfileService } from '@tt/profile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<IMessage[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<IChat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<ILastMessageResponse[]>(
      `${this.chatsUrl}get_my_chats/`,
    );
  }

  getChatById(chatId: number) {
    return this.http.get<IChat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.me()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      }),
    );
  }

  groupMessagesByDate(
    messages: IMessage[],
  ): { date: string; messages: IMessage[] }[] {
    if (!messages || !messages.length) {
      return [];
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const messagesByDate = messages.reduce(
      (acc, message) => {
        const messageDate = new Date(message.createdAt);
        let dateKey: string;

        if (messageDate.toDateString() === today.toDateString()) {
          dateKey = 'Сегодня';
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
          dateKey = 'Вчера';
        } else {
          dateKey = messageDate.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        }

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(message);
        return acc;
      },
      {} as { [key: string]: IMessage[] },
    );

    return Object.keys(messagesByDate)
      .map((date) => ({
        date,
        messages: messagesByDate[date],
      }))
      .sort((a, b) => {
        const getActualDate = (group: {
          date: string;
          messages: IMessage[];
        }) => {
          if (group.date === 'Сегодня') return today;
          if (group.date === 'Вчера') return yesterday;
          return new Date(group.messages[0].createdAt);
        };

        return getActualDate(a).getTime() - getActualDate(b).getTime();
      });
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
