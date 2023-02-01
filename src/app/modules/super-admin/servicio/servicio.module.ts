import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ServicioModule { }
