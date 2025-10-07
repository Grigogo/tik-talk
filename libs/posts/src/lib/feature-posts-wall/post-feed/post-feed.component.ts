import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  input,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/';
import { PostComponent } from '../';
import { PostService } from '../../data/';
import {
  debounceTime,
  firstValueFrom,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  postService = inject(PostService);
  feed = this.postService.posts;

  isCommentInput = input(false);
  postId = input<number>(0);
  profile = inject(ProfileService).me;

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();

    fromEvent(window, 'resize')
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(() => {
        this.resizeFeed();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();

    const height = window.innerHeight - top - 24 - 24;

    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComment({
          text: postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        }),
      ).then(() => {
        postText = '';
      });
      return;
    }
    firstValueFrom(
      this.postService.createPost({
        title: 'Клёвый пост',
        content: postText,
        authorId: this.profile()!.id,
      }),
    ).then(() => {
      postText = '';
    });
  }
}
