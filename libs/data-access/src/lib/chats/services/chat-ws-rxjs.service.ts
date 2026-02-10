import {
  IChatConnectionWSParams,
  IChatWsService,
} from '../interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { ChatWSMessage } from '../interfaces/chat-ws-message-base';
import { webSocket } from 'rxjs/webSocket';
import { finalize, Observable, tap } from 'rxjs';

export class ChatWsRxjsService implements IChatWsService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null;

  connect(params: IChatConnectionWSParams): Observable<ChatWSMessage> {
    if (!this.#socket) {
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() =>
        console.log('А что это вы тут делаете? Кино-то давно уже кончилось!'),
      ),
    );
  }

  disconnect(): void {
    this.#socket?.complete();
  }

  sendMessage(text: string, chatId: number): void {
    this.#socket?.next({
      text,
      chat_id: chatId,
    });
  }
}
