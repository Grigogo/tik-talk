import {Component, inject, signal} from '@angular/core';
import {ProfileService} from './data/services/profile.service';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('tik-talk');

  profileService = inject(ProfileService)
  profiles: any = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe(val => this.profiles = val);
  }
}
