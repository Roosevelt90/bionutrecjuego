import { Component, OnInit, ViewChild } from '@angular/core';
import data from '../../../assets/preguntas.js';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from'sweetalert2';

@Component({
  selector: 'app-seleccion-preguntas',
  templateUrl: './seleccion-preguntas.component.html',
  styleUrls: ['./seleccion-preguntas.component.css'],
  providers: [NgbCarouselConfig] 
})
export class SeleccionPreguntasComponent implements OnInit {

  temas: any;
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  imageIndex;

  constructor(config: NgbCarouselConfig) { 
    config.interval = 100000;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.temas = data.data;
  }

  forward(evt){

    if(!this.imageIndex){
      localStorage.setItem('tema', "1");
    }
    localStorage.setItem('tema', this.imageIndex.toString());
  }

  onSlide(event){    
    this.imageIndex = parseInt(event.current.replace("slideId_", ""), 10);
    console.log(this.imageIndex);
  }
}
