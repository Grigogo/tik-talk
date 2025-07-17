import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {ITokenResponse} from './auth.interface';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';
  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    return !!this.token;
  }

  // get isAuth() {
  //   console.log(this.token);
  //   if (!this.token) {
  //     this.token = this.cookieService.get('token');
  //   }
  //
  //   return !!this.token;
  // }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    console.log(fd)

    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post<ITokenResponse>(`${this.baseApiUrl}token`, fd).pipe(
      tap(val => {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookieService.set('token', this.token);
        this.cookieService.set('refreshToken', this.refreshToken);
      }),
    );
  }
}
