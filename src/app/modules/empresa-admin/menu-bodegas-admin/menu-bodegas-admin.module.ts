import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuBodegasAdminRoutingModule } from './menu-bodegas-admin-routing.module';
import { MenubodegasComponent } from './pages/menubodegas/menubodegas.component';


@NgModule({
  declarations: [
    MenubodegasComponent
  ],
  imports: [
    CommonModule,
    MenuBodegasAdminRoutingModule
  ],
  exports:[
    MenubodegasComponent
  ]
})
export class MenuBodegasAdminModule { }
