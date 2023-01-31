import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  hasCharacters: boolean = false;
  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getUserHeroes()
      .subscribe({
        next: (response) => {
          this.heroes = response.characterList;
          this.hasCharacters = !!this.heroes.length;
        }
      });
  }

  buscarHeroe(value: string) {

    let heroesFiltered: Heroe[] = [];
    value = value.toLowerCase();

    this.heroesService.getUserHeroes()
      .subscribe({
        next: (response) => {
          for (let h of response.characterList) {
            let heroeName = h.name.toLowerCase();

            if (heroeName.indexOf(value) >= 0) {
              heroesFiltered.push(h);
            }
          }
          this.heroes = heroesFiltered;
        }
      });
  }
}
