export interface IChatWSMessageBase {
  status: 'success' | 'error';
}

export interface IChatWSUnreadMessage extends IChatWSMessageBase {
  action: 'unread';
  data: {
    count: number;
  };
}

export interface IChatWSNewMessage extends IChatWSMessageBase {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    createdAt: string;
    author: number;
  };
}

export interface IChatWSError extends IChatWSMessageBase {
  message: string;
}

export interface IChatWSSendMessage {
  text: string;
  chat_id: number;
}

export type ChatWSMessage =
  | IChatWSUnreadMessage
  | IChatWSNewMessage
  | IChatWSError
  | IChatWSSendMessage;
