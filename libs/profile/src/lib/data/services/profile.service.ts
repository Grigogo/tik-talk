import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { IPageble } from '@tt/shared';
import { IProfile } from '@tt/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  me = signal<IProfile | null>(null);
  filteredProfiles = signal<IProfile[]>([]);

  getTestAccounts() {
    return this.http.get<IProfile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<IProfile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<IProfile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http
      .get<IPageble<IProfile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  patchProfile(profile: Partial<IProfile>) {
    return this.http.patch<IProfile>(`${this.baseApiUrl}account/me`, profile);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<IProfile>(
      `${this.baseApiUrl}account/upload_image`,
      fd,
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<
        IPageble<IProfile>
      >(`${this.baseApiUrl}account/accounts`, { params: params })
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
