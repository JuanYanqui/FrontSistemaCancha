import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidaAdministradorRoutingModule } from './bienvenida-administrador-routing.module';
import { BienvenidoAdministradorComponent } from './pages/bienvenido-administrador/bienvenido-administrador.component';


@NgModule({
  declarations: [
    BienvenidoAdministradorComponent
    
  ],
  imports: [
    CommonModule,
    BienvenidaAdministradorRoutingModule
  ],
  exports:[
    BienvenidoAdministradorComponent
  ]
})
export class BienvenidaAdministradorModule { }
