import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEstablecimientoRoutingModule } from './edit-establecimiento-routing.module';
import { EditEstablecimientoComponent } from './pages/edit-establecimiento/edit-establecimiento.component';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { ToggleButtonModule } from 'primeng/togglebutton';


@NgModule({
  declarations: [
    EditEstablecimientoComponent
  ],
  imports: [
    CommonModule,
    EditEstablecimientoRoutingModule,
    TableModule,
    PanelModule,
    ToggleButtonModule
  ],
  exports:[
    EditEstablecimientoComponent
  ]
})
export class EditEstablecimientoModule { }
