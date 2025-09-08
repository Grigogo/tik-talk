import { Component, HostBinding, input } from '@angular/core';
import { IMessage } from '../../../../../data/interfaces/chats.interface';
import { AvatarCircleComponent } from '../../../../../common-ui/avatar-circle/avatar-circle.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  imports: [AvatarCircleComponent, DatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
})
export class ChatWorkspaceMessageComponent {
  message = input.required<IMessage>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
