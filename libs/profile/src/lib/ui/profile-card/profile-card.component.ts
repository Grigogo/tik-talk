import { Component, Input } from '@angular/core';
import { IProfile } from '@tt/profile';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile?: IProfile;
}
