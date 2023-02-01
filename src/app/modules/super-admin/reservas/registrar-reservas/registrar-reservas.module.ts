import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarReservasRoutingModule } from './registrar-reservas-routing.module';
import { RegistroReservaComponent } from './pages/registro-reserva/registro-reserva.component';


@NgModule({
  declarations: [
    RegistroReservaComponent
  ],
  imports: [
    CommonModule,
    RegistrarReservasRoutingModule
  ]
})
export class RegistrarReservasModule { }
