import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditBodegaRoutingModule } from './edit-bodega-routing.module';
import { EditBodegaComponent } from './pages/edit-bodega/edit-bodega.component';
//PRIMENG MODULES IMPORTS
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DisponibilidadModule } from 'src/app/core/pipes/disponibilidad/disponibilidad.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    EditBodegaComponent
  ],
  imports: [
    CommonModule,
    EditBodegaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    PanelModule,
    TableModule,
    DisponibilidadModule,
    NgxSpinnerModule
  ],
  exports: [
    EditBodegaComponent
  ]
})
export class EditBodegaModule { }
