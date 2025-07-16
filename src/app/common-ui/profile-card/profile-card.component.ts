import {Component, Input} from '@angular/core';
import {IProfile} from '../../data/interfaces/profile.interface';
import {ImageUrlPipe} from '../../../helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [
    ImageUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {
  @Input() profile?: IProfile;
}
