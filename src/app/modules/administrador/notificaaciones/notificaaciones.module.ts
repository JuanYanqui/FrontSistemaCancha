import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificaacionesRoutingModule } from './notificaaciones-routing.module';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificaacionesRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class NotificaacionesModule { }