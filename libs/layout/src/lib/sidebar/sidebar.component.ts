import { Component, inject, signal } from '@angular/core';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImageUrlPipe, SvgIconComponent } from '@tt/common-ui';
import { ChatsService, ProfileService } from '@tt/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImageUrlPipe,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  #chatsService = inject(ChatsService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  unreadMessagesCount$ = this.#chatsService.unreadMessagesCount$;

  reconnect() {}

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats-page',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
    {
      label: 'Формы',
      icon: 'search',
      link: 'forms',
    },
  ];
  constructor() {
    this.#chatsService.connectWs().pipe(takeUntilDestroyed()).subscribe();
  }

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe());
  }
}
