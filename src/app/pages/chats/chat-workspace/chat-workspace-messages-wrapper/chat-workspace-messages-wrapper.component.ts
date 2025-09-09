import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import { IChat } from '../../../../data/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';
import {
  GroupedMessageByDatePipe,
} from '../../../../helpers/pipes/grouped-message-by-date.pipe';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent, GroupedMessageByDatePipe],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService);

  chat = input.required<IChat>();
  messages = this.chatsService.activeChatMessages;

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText),
    );

    await firstValueFrom(this.chatsService.getChatById(this.chat().id));
  }
}
