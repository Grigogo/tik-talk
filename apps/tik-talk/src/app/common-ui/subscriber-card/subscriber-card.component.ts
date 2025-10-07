import { Component, Input } from '@angular/core';
import { IProfile } from '@tt/profile';
import { ImageUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImageUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: IProfile;
}
