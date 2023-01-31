import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListComponent } from './pages/list/list.component';
import { HeroesService } from './services/heroes.service';
import { HeroeCardComponent } from './components/heroe-card/heroe-card.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { MylistComponent } from './pages/mylist/mylist.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    HeroeCardComponent,
    EditProfileComponent,
    MylistComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialModule
  ],
  providers: [
    HeroesService
  ]
})
export class CoreModule { }
