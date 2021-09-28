import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';

@Component({
  selector: 'app-registro-jugador',
  templateUrl: './registro-jugador.component.html',
  styleUrls: ['./registro-jugador.component.css']
})
export class RegistroJugadorComponent implements OnInit {
  jugador;
  identificacion;

  constructor() { }

  ngOnInit(): void {
    var jugador = localStorage.getItem('jugador');
    var identificacion = localStorage.getItem('identificacion');
    if(jugador){
      this.jugador = jugador;
    }
    if(identificacion){
      this.identificacion = identificacion;
    }
  }

  forward(evt){
    console.log('selecpreguntas');
    console.log(this.jugador);
    console.log(this.identificacion);

    if(!this.jugador){
      swal.fire('Información', 'El nombre del jugador es requerido', 'error');
      evt.preventDefault();
    }

    if(!this.identificacion){
      swal.fire('Información', 'El número de identificación del jugador es requerido', 'error');
      evt.preventDefault();
    }
    localStorage.setItem('jugador', this.jugador);
    localStorage.setItem('identificacion', this.identificacion);
  }

}
