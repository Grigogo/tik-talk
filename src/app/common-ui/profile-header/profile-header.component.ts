import {Component, input} from '@angular/core';
import {IProfile} from '../../data/interfaces/profile.interface';
import {ImageUrlPipe} from '../../helpers/pipes/image-url.pipe';
import {AvatarCircleComponent} from '../avatar-circle/avatar-circle.component';

@Component({
  selector: 'app-profile-header',
  imports: [
    ImageUrlPipe,
    AvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile = input<IProfile>()
}
