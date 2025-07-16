import {Component, signal} from '@angular/core';
import {
  ProfileCardComponent
} from './common-ui/profile-card/profile-card.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('tik-talk');


}
