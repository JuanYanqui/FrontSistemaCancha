import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstablecimientoRoutingModule } from './establecimiento-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    EstablecimientoRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class EstablecimientoModule { }
