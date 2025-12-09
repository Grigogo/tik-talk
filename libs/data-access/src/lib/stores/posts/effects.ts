import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PostService } from '@tt/data-access';
import { postActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostEffects {
  postService = inject(PostService);
  actions$ = inject(Actions);

  //Загрузка постов

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchPosts),
      switchMap((action) => {
        return this.postService.fetchPosts().pipe(
          map((posts) => {
            return postActions.postsLoaded({ posts });
          }),
          catchError((error) => {
            return of();
          }),
        );
      }),
    );
  });

  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap(({ payload }) => {
        return this.postService
          .createPost({
            title: payload.title,
            content: payload.content,
            authorId: payload.authorId,
          })
          .pipe(map(() => postActions.fetchPosts()));
      }),
    );
  });

  loadComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.fetchComments),
      switchMap(({ postId }) =>
        this.postService
          .getCommentsByPostId(postId)
          .pipe(map((comments) => postActions.commentsLoaded({ comments }))),
      ),
    );
  });

  createComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createComment),
      switchMap(({ payload }) => {
        return this.postService
          .createComment({
            text: payload.text,
            authorId: payload.authorId,
            postId: payload.postId,
          })
          .pipe(map(() => postActions.fetchPosts()));
      }),
    );
  });
}
