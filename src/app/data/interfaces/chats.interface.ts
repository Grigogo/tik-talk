import { IProfile } from './profile.interface';

export interface IChat {
  id: number;
  userFirst: IProfile;
  userSecond: IProfile;
  messages: IMessage[];
}

export interface IMessage {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
}
