import { IProfile } from '@tt/data-access';

export interface IChat {
  id: number;
  userFirst: IProfile;
  userSecond: IProfile;
  messages: IMessage[];
  companion?: IProfile;
}

export interface IMessage {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt?: string;
  user?: IProfile;
  isMine?: boolean;
}

export interface ILastMessageResponse {
  id: number;
  userFrom: IProfile;
  message: string | null;
}
