import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuClienteAdminRoutingModule } from './menu-cliente-admin-routing.module';
import { MenuClienteComponent } from './pages/menu-cliente/menu-cliente.component';


@NgModule({
  declarations: [
    MenuClienteComponent
  ],
  imports: [
    CommonModule,
    MenuClienteAdminRoutingModule
  ],
  exports:[
    MenuClienteComponent
  ]
})
export class MenuClienteAdminModule { }
