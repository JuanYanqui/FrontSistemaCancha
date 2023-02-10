import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListBodegaRoutingModule } from './list-bodega-routing.module';
import { ListBodegaComponent } from './pages/list-bodega/list-bodega.component';
//PRIMENG MODULES IMPORTS
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DisponibilidadModule } from 'src/app/core/pipes/disponibilidad/disponibilidad.module';
import { EditBodegaModule } from '../edit-bodega/edit-bodega.module';

@NgModule({
  declarations: [
    ListBodegaComponent
  ],
  imports: [
    CommonModule,
    ListBodegaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    PanelModule,
    TableModule,
    DisponibilidadModule,
    EditBodegaModule
  ],
  exports: [
    ListBodegaComponent
  ]
})
export class ListBodegaModule { }
