import { Component, computed, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../ui';
import { ChatsService, IChat } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<IChat>();
  groupedMessages = computed(() => {
    return this.chatsService.groupMessagesByDate(
      this.chatsService.activeChatMessages(),
    );
  });

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText),
    );

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
