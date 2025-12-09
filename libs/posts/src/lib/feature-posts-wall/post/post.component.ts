import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  GlobalStoreService,
  IComment,
  IPost,
  PostService,
  selectCommentsByPostId,
} from '@tt/data-access';
import { PostInputComponent } from '../../ui/';
import { CommentComponent } from '../../ui/';
import { firstValueFrom } from 'rxjs';
import {
  AvatarCircleComponent,
  DateFormatPipe,
  SvgIconComponent,
} from '@tt/common-ui';
import { Store } from '@ngrx/store';
import { postActions } from '@tt/data-access';

@Component({
  selector: 'app-post',
  imports: [
    AvatarCircleComponent,
    SvgIconComponent,
    PostInputComponent,
    CommentComponent,
    DateFormatPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<IPost>();
  // comments = signal<IComment[]>([]);
  profile = inject(GlobalStoreService).me;
  postService = inject(PostService);
  store = inject(Store);
  // comments = this.store.selectSignal(selectCommentsByPostId(this.post()!.id));

  async ngOnInit() {
    this.store.dispatch(postActions.fetchPosts());
  }
  onCreated(commentText: string) {
    if (!commentText) return;

    this.store.dispatch(
      postActions.createComment({
        payload: {
          text: commentText,
          authorId: this.profile()!.id,
          postId: this.post()!.id,
        },
      }),
    );
  }

  // async onCreated() {
  //   const comments = await firstValueFrom(
  //     this.postService.getCommentsByPostId(this.post()!.id),
  //   );
  //   this.comments.set(comments);
  // }
}
