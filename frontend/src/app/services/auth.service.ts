import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environmet';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  async signInWithGithub() {
    return this.httpClient
      .get(`${environment.BACKEND_URL}/auth/github`)
      .subscribe((res) => {
        console.log(res);
      });
  }
  getMe() {
    return this.httpClient.get(`${environment.BACKEND_URL}/me`, {
      withCredentials: true,
    });
  }

  checkAuth() {
    return this.httpClient.get(`${environment.BACKEND_URL}/check-auth`, {
      withCredentials: true,
    });
  }

  logout() {
    return this.httpClient
      .get(`${environment.BACKEND_URL}/auth/logout`, { withCredentials: true })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
