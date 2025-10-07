import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '@tt/chats';

@Component({
  selector: 'app-chats-page',
  imports: [RouterOutlet, ChatsListComponent],
  standalone: true,
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent {}
