import { Component, input } from '@angular/core';
import { ImageUrlPipe } from '../../pipes';

@Component({
  selector: 'app-avatar-circle',
  imports: [ImageUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss',
})
export class AvatarCircleComponent {
  avatarUrl = input<string | null>();
}
