import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IComment, IPost } from '../../data/';
import { PostInputComponent } from '../../ui/';
import { CommentComponent } from '../../ui/';
import { PostService } from '../../data/';
import { firstValueFrom } from 'rxjs';
import {
  AvatarCircleComponent,
  DateFormatPipe,
  SvgIconComponent,
} from '@tt/common-ui';

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

  comments = signal<IComment[]>([]);

  postService = inject(PostService);

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id),
    );
    this.comments.set(comments);
  }
}
