import {
  ChatWSMessage,
  IChatWSError,
  IChatWSNewMessage,
  IChatWSUnreadMessage,
} from './chat-ws-message-base';

export function isUnreadMessage(
  message: ChatWSMessage,
): message is IChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(
  message: ChatWSMessage,
): message is IChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}

export function isErrorMessage(
  message: ChatWSMessage,
): message is IChatWSError {
  return message === message;
}
