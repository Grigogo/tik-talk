import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDto,
  IComment,
  IPost,
  PostCreateDto,
} from '../interfaces/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<IPost[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http.post<IPost>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      }),
    );
  }

  fetchPosts() {
    return this.#http
      .get<IPost[]>(`${this.baseApiUrl}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<IComment>(`${this.baseApiUrl}comment/`, payload);
  }

  getCommentsByPostId(postId: number) {
    return this.#http
      .get<IPost>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
