import { Component, inject } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsService } from '../../../data/services/chats.sevice';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chats-list',
  imports: [ChatsBtnComponent, ReactiveFormsModule, AsyncPipe],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatsService = inject(ChatsService);

  chats$ = this.chatsService.getMyChats();
}
