import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuProveedoresAdminRoutingModule } from './menu-proveedores-admin-routing.module';
import { MenuproveedoresComponent } from './pages/menuproveedores/menuproveedores.component';


@NgModule({
  declarations: [
    MenuproveedoresComponent
  ],
  imports: [
    CommonModule,
    MenuProveedoresAdminRoutingModule
  ],
  exports:[
    MenuproveedoresComponent
  ]
})
export class MenuProveedoresAdminModule { }
