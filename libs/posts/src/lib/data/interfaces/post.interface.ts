import { IProfile } from '../../../../../profile/src/lib/data/interfaces/profile.interface';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
}

export interface IPost {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: IProfile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: string[];
  comments: IComment[];
}

export interface IComment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateDto {
  text: string;
  authorId: number;
  postId: number;
  commentId?: number;
}
