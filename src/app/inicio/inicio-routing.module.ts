import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegistroJugadorComponent } from './registro-jugador/registro-jugador.component';
import { ModoJuegoComponent } from './modo-juego/modo-juego.component';
import { TipoJugadorComponent } from './tipo-jugador/tipo-jugador.component';
import { SeleccionPreguntasComponent } from './seleccion-preguntas/seleccion-preguntas.component';
import { FelicidadesComponent } from './felicidades/felicidades.component';
import { RankingComponent } from './ranking/ranking.component';
import { JuegoComponent } from './juego/juego.component';

const routes:Routes = [
  {
    path:'',
    children:[
      {path:'registro' ,component: RegistroJugadorComponent },
      {path:'modojuego' ,component: ModoJuegoComponent },
      {path:'tipojugador' ,component: TipoJugadorComponent },
      {path:'selecpreguntas' ,component: SeleccionPreguntasComponent },
      {path:'felicidades' ,component: FelicidadesComponent },
      {path:'ranking' ,component: RankingComponent },
      {path:'juego' ,component: JuegoComponent },
      {path:'**' ,component: TipoJugadorComponent},
    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class InicioRoutingModule { }
