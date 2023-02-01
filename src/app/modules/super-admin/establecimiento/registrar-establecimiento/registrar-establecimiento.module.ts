import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarEstablecimientoRoutingModule } from './registrar-establecimiento-routing.module';
import { RegistrarEstablecimientoComponent } from './pages/registrar-establecimiento/registrar-establecimiento.component';


@NgModule({
  declarations: [
    RegistrarEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RegistrarEstablecimientoRoutingModule
  ]
})
export class RegistrarEstablecimientoModule { }
