import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarServiciosRoutingModule } from './registrar-servicios-routing.module';
import { RegistroServiciosComponent } from './pages/registro-servicios/registro-servicios.component';


@NgModule({
  declarations: [
    RegistroServiciosComponent
  ],
  imports: [
    CommonModule,
    RegistrarServiciosRoutingModule
  ]
})
export class RegistrarServiciosModule { }
