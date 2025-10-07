import { Component, input } from '@angular/core';
import { IComment } from '../../data';
import { AvatarCircleComponent, DateFormatPipe } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DateFormatPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<IComment>();
}
