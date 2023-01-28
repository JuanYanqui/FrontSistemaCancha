import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuProductosAdminRoutingModule } from './menu-productos-admin-routing.module';
import { MenuproductoComponent } from './pages/menuproducto/menuproducto.component';


@NgModule({
  declarations: [
    MenuproductoComponent
  ],
  imports: [
    CommonModule,
    MenuProductosAdminRoutingModule
  ],
  exports:[
    MenuproductoComponent
  ]
})
export class MenuProductosAdminModule { }
