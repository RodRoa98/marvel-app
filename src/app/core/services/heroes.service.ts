import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { BYPASS_JW_TOKEN } from '../interceptors/auth-token.service';
import { Heroe, ListHeroes } from '../interfaces/heroe.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getListHeroes(): Observable<ListHeroes> {
    return this.http.get<ListHeroes>(`${environment.marvelApi}/marvel/characters`, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, false),
    });
  }

  addHeroeToList(heroe: Heroe) {
    return this.http.post(`${environment.marvelApi}/users/characters`, heroe, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, false),
    });
  }

  getUserHeroes(): Observable<User> {
    return this.http.get<User>(`${environment.marvelApi}/users`, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, false),
    });
  }
}
