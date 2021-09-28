import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';

@Component({
  selector: 'app-modo-juego',
  templateUrl: './modo-juego.component.html',
  styleUrls: ['./modo-juego.component.css']
})
export class ModoJuegoComponent implements OnInit {
  flexRadioDefault1;
  flexRadioDefault2;

  constructor() { }

  ngOnInit(): void {
  }

  backFunction(){
alert("asd");
  }

  forward(evt){
    if(!this.flexRadioDefault1){
      swal.fire('Información', 'El modo de juego es requerido', 'error');
      evt.preventDefault();
    }
    localStorage.setItem('modoJuego', this.flexRadioDefault1);
  }

}
