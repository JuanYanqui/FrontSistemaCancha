import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuCompraAdminRoutingModule } from './menu-compra-admin-routing.module';
import { MenucompraComponent } from './pages/menucompra/menucompra.component';


@NgModule({
  declarations: [
    MenucompraComponent
  ],
  imports: [
    CommonModule,
    MenuCompraAdminRoutingModule
  ],
  exports:
  [
    MenucompraComponent
  ]
})
export class MenuCompraAdminModule { }
