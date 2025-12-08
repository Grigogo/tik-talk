import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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
      ofType(postActions.postsLoaded),
      switchMap(() => {
        return this.postService.fetchPosts().pipe(
          map((posts) => postActions.postsLoaded({ posts })),
          catchError((error) => {
            console.error('Ощибка загрузки постов', error);
            return of();
          }),
        );
      }),
    );
  });
}
