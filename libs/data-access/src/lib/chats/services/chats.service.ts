import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  IChat,
  ILastMessageResponse,
  IMessage,
  ITokenResponse,
} from '@tt/data-access';
import { ProfileService } from '@tt/data-access';
import { map, Observable, subscribeOn } from 'rxjs';
import { ChatWsNativeService } from './chat-ws-native.service';
import { IChatWsService } from '../interfaces/chat-ws-service.interface';
import { ChatWSMessage } from '../interfaces/chat-ws-message-base';
import {
  isErrorMessage,
  isNewMessage,
  isUnreadMessage,
} from '../interfaces/type-guards';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  #authService = inject(AuthService);
  me = inject(ProfileService).me;

  // wsAdapter: IChatWsService = new ChatWsNativeService();
  wsAdapter: IChatWsService = new ChatWsRxjsService();

  unreadMessagesCount$ = signal(0);

  activeChatMessages = signal<IMessage[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  connectWs() {
    return this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>;
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) return;

    if (isUnreadMessage(message)) {
      this.unreadMessagesCount$.set(message.data.count);
    }

    if (isErrorMessage(message)) {
      console.log('Invalid Token');
      this.#refreshToken();
      return;
    }

    if (isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.createdAt,
          isRead: false,
          isMine: false,
        },
      ]);
    }
  };

  #refreshToken() {
    this.#authService
      .refreshAuthToken()
      .subscribe((tokenResponse: ITokenResponse) => {
        console.log('Refresh token');

        this.wsAdapter.disconnect();
        this.connectWs().subscribe();
      });
  }

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
