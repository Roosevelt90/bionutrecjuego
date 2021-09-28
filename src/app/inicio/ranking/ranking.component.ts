import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  online;
  dataRanking = [];
  constructor(
    private router: Router,
    private service: ServicesService
  ) {
    this.online = window.navigator.onLine
   }

  ngOnInit(): void {
    localStorage.removeItem('nombreActivador');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('jugador');
    localStorage.removeItem('identificacion');
    localStorage.removeItem('tema');
    localStorage.removeItem('score');   
    const tpoe = this.service.getRanking().subscribe(data => {
      console.log(data.length);
      this.dataRanking = data;
      //window.location.href='#/inicio/ranking';
 /*      var datoJson = JSON.parse(localStorage.getItem('datoJson'));
      if(!datoJson){
       datoJson = data;
      }
   localStorage.setItem('datoJson', JSON.stringify(data));
 
       var nombreActivador = localStorage.getItem('nombreActivador');
       var tipoUsuario = localStorage.getItem('tipoUsuario');
 //alert(tipoUsuario);
       if(tipoUsuario){
         this.tipoUsuario = parseInt(tipoUsuario);
       } 
       if(nombreActivador && nombreActivador != 'undefined'){
         this.nombreUsuario = nombreActivador;
       }
       this.data = datoJson.tipoUsuario; */
       tpoe.unsubscribe();
   }); 

  }

  forward(){
/*     localStorage.removeItem('nombreActivador');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('jugador');
    localStorage.removeItem('identificacion');
    localStorage.removeItem('tema');
    localStorage.removeItem('score');    */
  }
}
