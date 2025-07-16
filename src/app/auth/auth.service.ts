import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'

  login(payload: { username: string, password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http.post(`${this.baseApiUrl}token`, fd).pipe(tap(val => {
    }))
  }
}
