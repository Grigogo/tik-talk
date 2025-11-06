import { Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { ILastMessageResponse } from '@tt/interfaces/chats';

@Component({
  selector: 'button[chats-page]',
  imports: [AvatarCircleComponent],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  chat = input<ILastMessageResponse>();
}
