import {Component, inject, input, signal} from '@angular/core';
import { ChatWorkspaceHeaderComponent } from '../chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import {MessageInputComponent} from '../../../../common-ui/message-input/message-input.component';
import {ChatsService} from '../../../../data/services/chats.service';
import {IChat, IMessage} from '../../../../data/interfaces/chats.interface';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatsService = inject(ChatsService)

  chat = input.required<IChat>()

  messages = signal<IMessage[]>([])

  ngOnInit() {
    this.messages.set(this.chat().messages)
  }
  async onSendMessage(messageText: string) {
    await firstValueFrom(this.chatsService.sendMessage(this.chat().id, messageText))

    const chat = await firstValueFrom(this.chatsService.getChatById(this.chat().id))

    this.messages.set(chat.messages)
  }
}
