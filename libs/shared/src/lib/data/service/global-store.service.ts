import { Injectable, signal } from '@angular/core';
import { IProfile } from '@tt/interfaces/profile';

@Injectable({ providedIn: 'root' })
export class GlobalStoreService {
  me = signal<IProfile | null>(null);
}
