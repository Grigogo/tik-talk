import { Component, input } from '@angular/core';
import { IProfile } from '@tt/interfaces/profile';
import { AvatarCircleComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<IProfile>();
}
