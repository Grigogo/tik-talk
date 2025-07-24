import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProfile} from '../interfaces/profile.interface';
import {IPageble} from '../interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<IProfile | null>(null);


  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getMe() {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getAccount(id: string) {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList() {
    return this.http.get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res => res.items.slice(0, 3))
      )
  }

  patchProfile(profile: Partial<IProfile>) {
    return this.http.patch<IProfile>(`${this.baseApiUrl}account/me`, profile)
  }
}
