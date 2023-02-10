import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodegaRoutingModule } from './bodega-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BodegaRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class BodegaModule { }
