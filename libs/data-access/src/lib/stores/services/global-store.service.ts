import { Injectable, signal } from '@angular/core';
import { IProfile } from './../../profile/index';

@Injectable({ providedIn: 'root' })
export class GlobalStoreService {
  me = signal<IProfile | null>(null);
}
