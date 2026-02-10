import { IMessage } from '@tt/data-access';
import { ChatWSMessage } from './chat-ws-message-base';
import { Observable } from 'rxjs';

export interface IChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWSMessage) => void;
}

export interface IChatWsService {
  connect: (params: IChatConnectionWSParams) => void | Observable<ChatWSMessage>;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
