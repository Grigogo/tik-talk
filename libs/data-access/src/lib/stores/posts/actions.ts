import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IComment, IPost } from '@tt/data-access';
import {
  CommentCreateDto,
  PostCreateDto,
} from '../../posts/interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'fetch posts': emptyProps(),
    'posts loaded': props<{ posts: IPost[] }>(),
    'create post': props<{ payload: PostCreateDto }>(),

    'fetch comments': props<{ postId: number }>(),
    'comments loaded': props<{ comments: IComment[] }>(),
    'create comment': props<{ payload: CommentCreateDto }>(),
  },
});
