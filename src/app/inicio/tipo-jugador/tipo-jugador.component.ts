import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import  *  as  dataJson  from  '../../_files/data.json';
import swal from'sweetalert2';

@Component({
  selector: 'app-tipo-jugador',
  templateUrl: './tipo-jugador.component.html',
  styleUrls: ['./tipo-jugador.component.css']
})
export class TipoJugadorComponent implements OnInit {

  data;
  products:  any  = (dataJson  as  any).default;
  tipoUsuario;
  nombreUsuario;

  constructor(
    private router: Router,
    private service: ServicesService
  ) { }

  ngOnInit(): void {

     const tpoe = this.service.getTipoJugadores().subscribe(data => {
     var datoJson = JSON.parse(localStorage.getItem('datoJson'));
     if(!datoJson){
      datoJson = data;
     }
  localStorage.setItem('datoJson', JSON.stringify(data));

      var nombreActivador = localStorage.getItem('nombreActivador');
      var tipoUsuario = localStorage.getItem('tipoUsuario');
      if(tipoUsuario){
        this.tipoUsuario = parseInt(tipoUsuario);
      } 
      if(nombreActivador && nombreActivador != 'undefined'){
        this.nombreUsuario = nombreActivador;
      }
      this.data = datoJson.tipoUsuario;
    
  },
  error => {
     var datajson = JSON.parse(localStorage.getItem('datoJson'));
     this.data = datajson.tipoUsuario;

  }
  ); 


  //tpoe.unsubscribe();
  }

  forward(evt){

    if(!this.nombreUsuario){
      swal.fire('Información', 'Debes ingresar el nombre del activador', 'error');
      evt.preventDefault();
    }

    if(!this.tipoUsuario){
      swal.fire('Información', 'Debes escoger un tipo de usuario', 'error');
      evt.preventDefault();
    }
    localStorage.setItem('nombreActivador', this.nombreUsuario);
    localStorage.setItem('tipoUsuario', this.tipoUsuario);
  }
}
