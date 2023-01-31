import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentaRoutingModule } from './venta-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    VentaRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports:[

  ]
})
export class VentaModule { }
