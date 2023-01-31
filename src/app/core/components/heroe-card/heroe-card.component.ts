import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-heroe-card',
  templateUrl: './heroe-card.component.html',
  styleUrls: ['./heroe-card.component.css']
})
export class HeroeCardComponent {
  @Input()
  heroe!: Heroe;

  @Input()
  isMyList: boolean = true;

  @Output()
  onAddHeroeToList: EventEmitter<Heroe> = new EventEmitter();

  addHeroeToList() {
    this.onAddHeroeToList.emit(this.heroe);
  }
}
