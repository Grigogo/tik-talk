import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IComment, IPost } from '@tt/data-access';
import { PostCreateDto } from '../../posts/interfaces/post.interface';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'fetch posts': emptyProps(),
    'posts loaded': props<{ posts: IPost[] }>(),
    'create post': props<{ payload: PostCreateDto }>(),
    'create comment': props<{ comment: IComment }>(),
    'comments loaded': props<{ postId: number; comment: IComment[] }>(),
  },
});
