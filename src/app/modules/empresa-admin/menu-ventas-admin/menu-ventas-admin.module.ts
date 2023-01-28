import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuVentasAdminRoutingModule } from './menu-ventas-admin-routing.module';
import { MenuventasComponent } from './pages/menuventas/menuventas.component';


@NgModule({
  declarations: [
    MenuventasComponent
  ],
  imports: [
    CommonModule,
    MenuVentasAdminRoutingModule
  ],
  exports:[
    MenuventasComponent
  ]
})
export class MenuVentasAdminModule { }
