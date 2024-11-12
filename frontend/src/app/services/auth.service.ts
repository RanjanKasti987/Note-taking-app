import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signInWithGithub() {
    this.httpClient
      .get(
        'https://sturdy-broccoli-wxq4gxrw496257x4-3000.app.github.dev/auth/github',
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers':
              'Origin, Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token, locale',
            'Access-Control-Allow-Methods': 'GET, POST',
          },
        }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
