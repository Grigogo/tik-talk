import { Component, input } from '@angular/core';
import { IComment } from '../../../../data/interfaces/post.interface';
import { AvatarCircleComponent } from '../../../../common-ui/avatar-circle/avatar-circle.component';
import { DateFormatPipe } from '../../../../helpers/pipes/date-format.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarCircleComponent, DateFormatPipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<IComment>();
}
