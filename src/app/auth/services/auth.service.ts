import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { UserModel } from '../models/user.model';
import { BYPASS_JW_TOKEN } from '../../core/interceptors/auth-token.service';
import { RegisterUserModel } from '../models/register-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;

  constructor(private http: HttpClient) {
    this.userToken = '';
  }

  login(user: UserModel): Observable<Object> {
    return this.http.post(`${environment.marvelApi}/auth/authenticate`, user, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, true)
    })
      .pipe(
        map((res) => {
          this.setToken(res['jwtToken']);
          return res;
        })
      );
  }

  registerUser(registerUser: RegisterUserModel): Observable<Object> {
    return this.http.post(`${environment.marvelApi}/users`, registerUser, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, true)
    });
  }

  setToken(tokenJWT: string) {
    localStorage.setItem('token', tokenJWT);
  }

  getToken(): string {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') || '';
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    return (!!this.getToken());
  }

  logout() {
    localStorage.removeItem('token');
  }
}
