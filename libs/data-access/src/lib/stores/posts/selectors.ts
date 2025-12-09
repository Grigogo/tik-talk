import { createSelector } from '@ngrx/store';
import { postFeature } from './reducer';
import { IPost } from '../../posts';

export const selectAllPosts = createSelector(
  postFeature.selectPosts,
  (posts: IPost[]) => posts,
);
