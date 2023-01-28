import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPedidosAdminRoutingModule } from './menu-pedidos-admin-routing.module';
import { MenupedidosComponent } from './pages/menupedidos/menupedidos.component';


@NgModule({
  declarations: [
    MenupedidosComponent
  ],
  imports: [
    CommonModule,
    MenuPedidosAdminRoutingModule
  ],
  exports:[
    MenupedidosComponent
  ]
})
export class MenuPedidosAdminModule { }
