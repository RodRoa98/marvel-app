import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(
    private heroesService: HeroesService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroesService.getListHeroes()
      .subscribe({
        next: (response) => {
          this.heroes = response.data.results;
        }
      });
  }

  buscarHeroe(value: string) {

    let heroesFiltered: Heroe[] = [];
    value = value.toLowerCase();

    this.heroesService.getListHeroes()
      .subscribe({
        next: (response) => {
          for (let h of response.data.results) {
            let heroeName = h.name.toLowerCase();

            if (heroeName.indexOf(value) >= 0) {
              heroesFiltered.push(h);
            }
          }
          this.heroes = heroesFiltered;
        }
      });
  }

  addHeroeToMyList(heroe: Heroe) {
    console.log(heroe);

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por favor...'
    });
    Swal.showLoading();

    this.heroesService.addHeroeToList(heroe)
      .subscribe({
        next: (response) => {
          Swal.close();

          localStorage.setItem('listHeroes', JSON.stringify(response['characterList']));

          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            text: 'Heroe agregado correctamente a tu lista'
          });
        },
        error: (err) => {
          Swal.fire('Error al agregar heroe a tu lista', err.message, 'error');
        }
      })
  }

}
