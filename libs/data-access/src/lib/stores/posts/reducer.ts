import { IComment, IPost } from '@tt/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postActions } from './actions';

export interface PostState {
  posts: IPost[];
  comments: Record<number, IComment[]>;
}

const initialState: PostState = {
  posts: [],
  comments: {},
};

export const postFeature = createFeature({
  name: 'postFeature',
  reducer: createReducer(
    initialState,
    on(postActions.postsLoaded, (state, { posts }) => {
      return {
        ...state,
        posts,
      };
    }),
  ),
});
