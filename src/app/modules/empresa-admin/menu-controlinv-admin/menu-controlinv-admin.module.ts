import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuControlinvAdminRoutingModule } from './menu-controlinv-admin-routing.module';
import { ControlinvComponent } from './pages/controlinv/controlinv.component';


@NgModule({
  declarations: [
    ControlinvComponent
  ],
  imports: [
    CommonModule,
    MenuControlinvAdminRoutingModule
  ],
  exports:[
    ControlinvComponent
  ]
})
export class MenuControlinvAdminModule { }
