import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientePedidoRoutingModule } from './cliente-pedido-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ClientePedidoRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class ClientePedidoModule { }
