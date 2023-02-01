import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEstablecimientoRoutingModule } from './edit-establecimiento-routing.module';
import { EditEstablecimientoComponent } from './pages/edit-establecimiento/edit-establecimiento.component';


@NgModule({
  declarations: [
    EditEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    EditEstablecimientoRoutingModule
  ]
})
export class EditEstablecimientoModule { }
