import { Component, Input } from '@angular/core';
import { IProfile } from '../../data/interfaces/profile.interface';
import { ImageUrlPipe } from '../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImageUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: IProfile;
}
