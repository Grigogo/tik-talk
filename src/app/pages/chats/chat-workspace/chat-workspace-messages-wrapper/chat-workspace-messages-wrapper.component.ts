import { Component } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from '../chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  imports: [ChatWorkspaceMessageComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {}
