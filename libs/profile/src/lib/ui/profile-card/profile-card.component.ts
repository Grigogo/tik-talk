import {Component, inject, Input} from '@angular/core';
import {IProfile, ProfileService} from '@tt/data-access';
import { AvatarCircleComponent } from '@tt/common-ui';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarCircleComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @Input() profile?: IProfile;

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {
      queryParams: { userId: userId },
    });
  }
}
