import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { expect, test } from '@jest/globals';
import { HttpClient } from '@angular/common/http';
import { ListHeroes } from '../interfaces/heroe.interface';
import { environment } from './../../../environments/environment';

const httpClientMock = {
  get: jest.fn()
}

const heroesMock: ListHeroes = {
  "code": 200,
  "attributionText": "Data provided by Marvel. © 2023 MARVEL",
  "data": {
    "offset": 0,
    "limit": 20,
    "total": 1562,
    "count": 20,
    "results": [
      {
        "id": 1011334,
        "name": "3-D Man",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784.jpg"
      },
      {
        "id": 1017100,
        "name": "A-Bomb (HAS)",
        "description": "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg"
      },
      {
        "id": 1009144,
        "name": "A.I.M.",
        "description": "AIM is a terrorist organization bent on destroying the world.",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec.jpg"
      },
      {
        "id": 1010699,
        "name": "Aaron Stack",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1009146,
        "name": "Abomination (Emil Blonsky)",
        "description": "Formerly known as Emil Blonsky, a spy of Soviet Yugoslavian origin working for the KGB, the Abomination gained his powers after receiving a dose of gamma radiation similar to that which transformed Bruce Banner into the incredible Hulk.",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04.jpg"
      },
      {
        "id": 1016823,
        "name": "Abomination (Ultimate)",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1009148,
        "name": "Absorbing Man",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/1/b0/5269678709fb7.jpg"
      },
      {
        "id": 1009149,
        "name": "Abyss",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64.jpg"
      },
      {
        "id": 1010903,
        "name": "Abyss (Age of Apocalypse)",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/3/80/4c00358ec7548.jpg"
      },
      {
        "id": 1011266,
        "name": "Adam Destine",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1010354,
        "name": "Adam Warlock",
        "description": "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860.jpg"
      },
      {
        "id": 1010846,
        "name": "Aegis (Trey Rollins)",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d.gif"
      },
      {
        "id": 1017851,
        "name": "Aero (Aero)",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1012717,
        "name": "Agatha Harkness",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4ce5a9bf70e19.jpg"
      },
      {
        "id": 1011297,
        "name": "Agent Brand",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/4/60/52695285d6e7e.jpg"
      },
      {
        "id": 1011031,
        "name": "Agent X (Nijo)",
        "description": "Originally a partner of the mind-altering assassin Black Swan, Nijo spied on Deadpool as part of the Swan's plan to exact revenge for Deadpool falsely taking credit for the Swan's assassination of the Four Winds crime family, which included Nijo's brother.",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1009150,
        "name": "Agent Zero",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c0042121d790.jpg"
      },
      {
        "id": 1011198,
        "name": "Agents of Atlas",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4ce18a834b7f5.jpg"
      },
      {
        "id": 1011175,
        "name": "Aginar",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      },
      {
        "id": 1011136,
        "name": "Air-Walker (Gabriel Lan)",
        "description": "",
        "image": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      }
    ]
  }
}

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    heroesService = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('should be created', () => {
    expect(heroesService).toBeTruthy();
  });

  test('should return the list of heroes', () => {
    heroesService.getListHeroes().subscribe({
      next: (res) => {
        expect(res).toEqual(heroesMock);
      },
    });

    const req = httpTestingController.expectOne(`${environment.marvelApi}/marvel/characters`);
    expect(req.request.method).toEqual('GET');

    req.flush(heroesMock);
  });
});
