import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-felicidades',
  templateUrl: './felicidades.component.html',
  styleUrls: ['./felicidades.component.css']
})
export class FelicidadesComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('nombreActivador');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('jugador');
    localStorage.removeItem('identificacion');
    localStorage.removeItem('tema');
  }

  forward(){
    console.log('selecpreguntas');
    //this.router.navigate(['/registro/selecpreguntas']);
  }
}
