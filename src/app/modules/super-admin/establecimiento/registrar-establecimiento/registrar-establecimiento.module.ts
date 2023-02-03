import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarEstablecimientoRoutingModule } from './registrar-establecimiento-routing.module';
import { RegistrarEstablecimientoComponent } from './pages/registrar-establecimiento/registrar-establecimiento.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { EditEstablecimientoModule } from '../edit-establecimiento/edit-establecimiento.module';
import { PanelModule } from 'primeng/panel';

@NgModule({
  declarations: [
    RegistrarEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RegistrarEstablecimientoRoutingModule,
    MatTableModule,
    MatTabsModule,
    EditEstablecimientoModule,
    PanelModule
  ]
})
export class RegistrarEstablecimientoModule { }
