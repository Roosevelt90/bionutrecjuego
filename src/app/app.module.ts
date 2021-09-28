import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//import modulos
import { InicioModule } from './inicio/inicio.module';

//routes
import { RouterModule, Routes } from '@angular/router';
import { RegistroJugadorComponent } from './inicio/registro-jugador/registro-jugador.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesService } from './services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxFsModule } from 'ngx-fs';
import { JuegoComponent } from './inicio/juego/juego.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'registro', component: RegistroJugadorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgbModule
  ],
  providers: [
    ServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
