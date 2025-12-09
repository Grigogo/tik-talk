import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/';
import { PostComponent } from '../';
import { postActions, PostService, selectAllPosts } from '@tt/data-access';
import {
  debounceTime,
  firstValueFrom,
  fromEvent,
  Subject,
  takeUntil,
} from 'rxjs';
import { GlobalStoreService } from '@tt/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit, AfterViewInit, OnDestroy {
  postService = inject(PostService);
  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);
  private destroy$ = new Subject<void>();
  profile = inject(GlobalStoreService).me;
  store = inject(Store);
  feed = this.store.selectSignal(selectAllPosts);

  isCommentInput = input(false);
  postId = input<number>(0);

  @Output() created = new EventEmitter();

  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput();
  }

  ngOnInit() {
    this.store.dispatch(postActions.fetchPosts());
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

    this.store.dispatch(
      postActions.createPost({
        payload: {
          title: 'Клёвый пост',
          content: postText,
          authorId: this.profile()!.id,
        },
      }),
    );
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
  }
}
