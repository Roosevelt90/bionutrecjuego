import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroJugadorComponent } from './registro-jugador/registro-jugador.component';
import { SeleccionPreguntasComponent } from './seleccion-preguntas/seleccion-preguntas.component';
import { ModoJuegoComponent } from './modo-juego/modo-juego.component';
import { TipoJugadorComponent } from './tipo-jugador/tipo-jugador.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  declarations: [
    RegistroJugadorComponent,
    SeleccionPreguntasComponent,
    ModoJuegoComponent,
    TipoJugadorComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule,
    NgbModule
  ],
  exports: [
    RegistroJugadorComponent,
    SeleccionPreguntasComponent,
    ModoJuegoComponent,
    TipoJugadorComponent,
    RankingComponent
  ]
})
export class InicioModule { }
