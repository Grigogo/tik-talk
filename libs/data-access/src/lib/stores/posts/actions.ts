import { createActionGroup, props } from '@ngrx/store';
import { IComment, IPost } from '@tt/data-access';

export const postActions = createActionGroup({
  source: 'post',
  events: {
    'posts loaded': props<{ posts: IPost[] }>(),
    'create post': props<{ post: IPost }>(),
    'create comment': props<{ comment: IComment }>(),
    'comments loaded': props<{ postId: number; comment: IComment[] }>(),
  },
});
