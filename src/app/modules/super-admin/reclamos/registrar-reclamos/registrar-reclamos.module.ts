import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarReclamosRoutingModule } from './registrar-reclamos-routing.module';
import { RegistroReclamoComponent } from './pages/registro-reclamo/registro-reclamo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistroReclamoComponent
  ],
  imports: [
    CommonModule,
    RegistrarReclamosRoutingModule,
    FormsModule
  ]
})
export class RegistrarReclamosModule { }
